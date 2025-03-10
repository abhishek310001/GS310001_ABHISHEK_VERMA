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

// Column Widths
export const COLUMN_WIDTHS = {
  id: 100,
  store: 200,
  actions: 120,
  seqNo: 70,
  city: 150,
  state: 100,
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
