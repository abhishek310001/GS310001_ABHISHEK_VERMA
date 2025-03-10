import React, { useMemo } from 'react';
import { Box, Button } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, RowDragEndEvent } from 'ag-grid-community';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Store } from '../../types';
import GridLoader from '../GridLoader';
import { COLUMN_WIDTHS, DEFAULT_COL_DEF, GRID_PROPS, GRID_CONTAINER_STYLE, LOADING_DELAY } from '../../constants/gridConstants';

interface StoresGridProps {
  stores: Store[];
  isLoading: boolean;
  onEditStore: (store: Store) => void;
  onDeleteStore: (id: string) => void;
  onRowDragEnd: (event: RowDragEndEvent) => void;
  setIsLoading: (loading: boolean) => void;
}

const StoresGrid: React.FC<StoresGridProps> = ({
  stores,
  isLoading,
  onEditStore,
  onDeleteStore,
  onRowDragEnd,
  setIsLoading
}) => {
  const columnDefs = useMemo<ColDef[]>(() => [
    {
      field: 'seqNo',
      headerName: '#',
      width: COLUMN_WIDTHS.seqNo,
      rowDrag: true,
      suppressMenu: true,
      suppressMovable: true,
      lockPosition: true
    },
    {
      field: 'id',
      headerName: 'ID',
      width: COLUMN_WIDTHS.id,
      suppressMovable: true
    },
    {
      field: 'label',
      headerName: 'Store',
      flex: 1,
      minWidth: COLUMN_WIDTHS.store,
      suppressMovable: true
    },
    {
      field: 'city',
      headerName: 'City',
      width: COLUMN_WIDTHS.city,
      suppressMovable: true
    },
    {
      field: 'state',
      headerName: 'State',
      width: COLUMN_WIDTHS.state,
      suppressMovable: true
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
            onClick={() => onEditStore(params.data)}
            sx={{ minWidth: 'auto', p: 0.5, mr: 1 }}
          >
            <EditIcon fontSize="small" />
          </Button>
          <Button
            size="small"
            color="error"
            onClick={() => onDeleteStore(params.data.id)}
            sx={{ minWidth: 'auto', p: 0.5 }}
          >
            <DeleteIcon fontSize="small" />
          </Button>
        </Box>
      )
    }
  ], [onEditStore, onDeleteStore]);

  const defaultColDef = useMemo(() => DEFAULT_COL_DEF, []);

  const rowData = useMemo(() => {
    return [...stores].sort((a, b) => a.seqNo - b.seqNo);
  }, [stores]);

  return (
    <Box className="ag-theme-alpine" sx={GRID_CONTAINER_STYLE}>
      {isLoading && <GridLoader />}
      <AgGridReact
        {...GRID_PROPS}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowDragManaged={true}
        onRowDragEnd={onRowDragEnd}
        suppressMoveWhenRowDragging={false}
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

export default StoresGrid; 
