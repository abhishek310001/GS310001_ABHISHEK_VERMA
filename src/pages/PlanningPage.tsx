import React, { useState, useCallback } from 'react';
import { Box, Typography } from '@mui/material';
import { CellStyleModule, CellValueChangedEvent, ModuleRegistry, NumberEditorModule } from 'ag-grid-community';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { updateSalesUnits } from '../redux/planningSlice';
import PlanningGrid from '../components/planning/PlanningGrid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([CellStyleModule, NumberEditorModule])

const PlanningPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stores } = useAppSelector(state => state.stores);
  const { skus } = useAppSelector(state => state.skus);
  const { weeks, planningData } = useAppSelector(state => state.planning);
  const [isLoading, setIsLoading] = useState(true);

  const handleCellValueChanged = useCallback((params: CellValueChangedEvent) => {
    const field = params.column.getColId();
    if (field.startsWith('salesUnits_')) {
      const weekId = field.replace('salesUnits_', '');
      const storeId = stores.find(store => store.label === params.data.storeLabel)?.id;
      const skuId = skus.find(sku => sku.label === params.data.skuLabel)?.id;
      
      if (storeId && skuId) {
        dispatch(updateSalesUnits({
          storeId,
          skuId,
          weekId,
          salesUnits: Number(params.newValue) || 0
        }));
      }
    }
  }, [dispatch, stores, skus]);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Planning</Typography>
      
      <PlanningGrid
        stores={stores}
        skus={skus}
        weeks={weeks}
        planningData={planningData}
        isLoading={isLoading}
        onCellValueChanged={handleCellValueChanged}
        setIsLoading={setIsLoading}
      />
    </Box>
  );
};

export default PlanningPage;
