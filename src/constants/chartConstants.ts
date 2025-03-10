// Chart Container Style
export const CHART_CONTAINER_STYLE = {
  height: 'calc(100vh - 300px)'
} as const;

// Chart Margins
export const CHART_MARGINS = {
  top: 20,
  right: 30,
  left: 20,
  bottom: 5
} as const;

// Chart Colors
export const CHART_COLORS = {
  gmDollars: '#82ca9d',
  gmPercentage: '#ff7300'
} as const;

// Chart Line Properties
export const LINE_PROPERTIES = {
  strokeWidth: 2,
  type: 'monotone'
} as const;

// Bar Properties
export const BAR_PROPERTIES = {
  barSize: 20
} as const;

// Grid Properties
export const GRID_PROPERTIES = {
  strokeDasharray: '3 3'
} as const; 
