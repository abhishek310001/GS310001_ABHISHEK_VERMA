import { RowModelType } from 'ag-grid-community';

// Grid Default Settings
export const DEFAULT_COL_DEF = {
  sortable: true,
  filter: true,
  resizable: true,
  minWidth: 80,
  suppressMenu: true,
  enableCellChangeFlash: false
};

// Grid Properties
export const GRID_PROPS = {
  animateRows: true,
  rowBuffer: 10,
  rowModelType: 'clientSide' as RowModelType,
  maxBlocksInCache: 2,
  cacheBlockSize: 100,
  maxConcurrentDatasourceRequests: 1,
  infiniteInitialRowCount: 1000,
  pagination: false,
  suppressColumnVirtualisation: false
};

// Cell Styles
export const CELL_STYLES = {
  numeric: {
    textAlign: 'right',
    paddingRight: '10px'
  },
  header: {
    backgroundColor: '#f5f5f5'
  }
} as const;

// Column Widths
export const COLUMN_WIDTHS = {
  id: 100,
  store: 200,
  sku: 300,
  actions: 120,
  seqNo: 70,
  city: 150,
  state: 100,
  class: 120,
  department: 150,
  price: 100,
  cost: 100,
  salesUnits: 80,
  salesDollars: 100,
  gmDollars: 100,
  gmPercentage: 80,
};

// Style Constants
export const GRID_CONTAINER_STYLE = {
  height: 'calc(100vh - 200px)',
  width: '100%',
  position: 'relative',
  overflow: 'hidden'
} as const;

// Loading Delay
export const LOADING_DELAY = 300;

// Value Formatters
export const VALUE_FORMATTERS = {
  currency: (params: { value: number }) => params.value ? `$${params.value.toFixed(2)}` : '',
  percentage: (params: { value: number }) => params.value ? `${params.value.toFixed(1)}%` : ''
}; 
