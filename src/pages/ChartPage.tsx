import React, { useState, useCallback } from 'react';
import { Box, Typography, SelectChangeEvent } from '@mui/material';
import { useAppSelector } from '../redux/hooks';
import { useChartData } from '../components/chart/useChartData';
import StoreSelector from '../components/chart/StoreSelector';
import PerformanceChart from '../components/chart/PerformanceChart';
import { CHART_CONTAINER_STYLE } from '../constants/chartConstants';

const ChartPage: React.FC = () => {
  const { stores } = useAppSelector(state => state.stores);
  const { skus } = useAppSelector(state => state.skus);
  const { weeks, planningData } = useAppSelector(state => state.planning);
  const [selectedStore, setSelectedStore] = useState<string>('');

  const handleStoreChange = useCallback((event: SelectChangeEvent) => {
    setSelectedStore(event.target.value);
  }, []);

  const chartData = useChartData(selectedStore, planningData, stores, skus, weeks);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Chart</Typography>
      
      <Box sx={{ mb: 3 }}>
        <StoreSelector
          stores={stores}
          selectedStore={selectedStore}
          onChange={handleStoreChange}
        />
      </Box>
      
      <Box sx={CHART_CONTAINER_STYLE}>
        <PerformanceChart data={chartData} />
      </Box>
    </Box>
  );
};

export default ChartPage; 
