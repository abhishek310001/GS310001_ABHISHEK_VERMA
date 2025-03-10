import React, { useMemo } from 'react';
import { Box, Button } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SKU } from '../../types';
import GridLoader from '../GridLoader';
import { COLUMN_WIDTHS, DEFAULT_COL_DEF, GRID_PROPS, GRID_CONTAINER_STYLE, VALUE_FORMATTERS, LOADING_DELAY } from '../../constants/gridConstants';

interface SKUsGridProps {
  skus: SKU[];
  isLoading: boolean;
  onEditSKU: (sku: SKU) => void;
  onDeleteSKU: (id: string) => void;
  setIsLoading: (loading: boolean) => void;
}

const SKUsGrid: React.FC<SKUsGridProps> = ({
  skus,
  isLoading,
  onEditSKU,
  onDeleteSKU,
  setIsLoading
}) => {
  const columnDefs = useMemo<ColDef[]>(() => [
    {
      field: 'id',
      headerName: 'SKU ID',
      width: COLUMN_WIDTHS.id,
      suppressMovable: true,
      lockPosition: true
    },
    {
      field: 'label',
      headerName: 'SKU',
      flex: 1,
      minWidth: COLUMN_WIDTHS.sku,
      suppressMovable: true
    },
    {
      field: 'class',
      headerName: 'Class',
      width: COLUMN_WIDTHS.class,
      suppressMovable: true
    },
    {
      field: 'department',
      headerName: 'Department',
      width: COLUMN_WIDTHS.department,
      suppressMovable: true
    },
    {
      field: 'price',
      headerName: 'Price',
      width: COLUMN_WIDTHS.price,
      suppressMovable: true,
      type: 'numericColumn',
      valueFormatter: VALUE_FORMATTERS.currency
    },
    {
      field: 'cost',
      headerName: 'Cost',
      width: COLUMN_WIDTHS.cost,
      suppressMovable: true,
      type: 'numericColumn',
      valueFormatter: VALUE_FORMATTERS.currency
    },
    {
      headerName: 'Actions',
      width: COLUMN_WIDTHS.actions,
      suppressMovable: true,
      lockPosition: true,
      pinned: 'right',
      cellRenderer: (params: any) => (
        <Box>
          <Button
            size="small"
            onClick={() => onEditSKU(params.data)}
            sx={{ minWidth: 'auto', p: 0.5, mr: 1 }}
          >
            <EditIcon fontSize="small" />
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => onDeleteSKU(params.data.id)}
            sx={{ minWidth: 'auto', p: 0.5 }}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </Box>
      )
    }
  ], [onEditSKU, onDeleteSKU]);

  const defaultColDef = useMemo(() => DEFAULT_COL_DEF, []);

  return (
    <Box className="ag-theme-alpine" sx={GRID_CONTAINER_STYLE}>
      {isLoading && <GridLoader />}
      <AgGridReact
        {...GRID_PROPS}
        rowData={skus}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={() => setIsLoading(false)}
        onFilterChanged={() => {
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), LOADING_DELAY);
        }}
        onSortChanged={() => {
          setIsLoading(true);
          setTimeout(() => setIsLoading(false), LOADING_DELAY);
        }}
      />
    </Box>
  );
};

export default React.memo(SKUsGrid); 
