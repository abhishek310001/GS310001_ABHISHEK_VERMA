import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { CellClassParams, CellValueChangedEvent } from 'ag-grid-community';
import { Store, SKU, Week, PlanningData } from '../../types';
import GridLoader from '../GridLoader';
import { COLUMN_WIDTHS, DEFAULT_COL_DEF, GRID_PROPS, GRID_CONTAINER_STYLE, CELL_STYLES, VALUE_FORMATTERS, LOADING_DELAY } from '../../constants/gridConstants';
import { getGMPercentageColor, processCalculatedPlanningData } from '../../utils/calculations';

interface PlanningGridProps {
  stores: Store[];
  skus: SKU[];
  weeks: Week[];
  planningData: PlanningData[];
  isLoading: boolean;
  onCellValueChanged: (params: CellValueChangedEvent) => void;
  setIsLoading: (loading: boolean) => void;
}

const PlanningGrid: React.FC<PlanningGridProps> = ({
  stores,
  skus,
  weeks,
  planningData,
  isLoading,
  onCellValueChanged,
  setIsLoading
}) => {
  const columnDefs = useMemo(() => {
    const baseColumns = [
      { 
        field: 'storeLabel',
        headerName: 'Store',
        width: COLUMN_WIDTHS.store,
      },
      {
        field: 'skuLabel',
        headerName: 'SKU',
        width: COLUMN_WIDTHS.sku
      }
    ];

    const monthGroups = weeks.reduce((acc, week) => {
      if (!acc[week.monthLabel]) {
        acc[week.monthLabel] = [];
      }
      acc[week.monthLabel].push(week);
      return acc;
    }, {} as Record<string, typeof weeks>);

    const weekColumns = Object.entries(monthGroups).map(([month, monthWeeks]) => ({
      groupId: `month_${month}`,
      headerName: month,
      children: monthWeeks.map(week => ({
        groupId: `week_${week.id}`,
        headerName: week.weekLabel,
        children: [
          {
            field: `salesUnits_${week.id}`,
            headerName: 'Sales Units',
            width: COLUMN_WIDTHS.salesUnits,
            type: 'numericColumn',
            editable: true,
            cellStyle: CELL_STYLES.numeric,
          },
          {
            field: `salesDollars_${week.id}`,
            headerName: 'Sales $',
            width: COLUMN_WIDTHS.salesDollars,
            type: 'numericColumn',
            valueFormatter: VALUE_FORMATTERS.currency
          },
          {
            field: `gmDollars_${week.id}`,
            headerName: 'GM $',
            width: COLUMN_WIDTHS.gmDollars,
            type: 'numericColumn',
            valueFormatter: VALUE_FORMATTERS.currency
          },
          {
            field: `gmPercentage_${week.id}`,
            headerName: 'GM %',
            width: COLUMN_WIDTHS.gmPercentage,
            type: 'numericColumn',
            valueFormatter: VALUE_FORMATTERS.percentage,
            cellStyle: (params: CellClassParams) => {
              if (!params.value) return { backgroundColor: 'transparent' };
              const bgColor = getGMPercentageColor(params.value);
              return {
                backgroundColor: bgColor,
              };
            }
          }
        ]
      }))
    }));

    return [...baseColumns, ...weekColumns];
  }, [weeks]);

  const defaultColDef = useMemo(() => DEFAULT_COL_DEF, []);

  const rowData = useMemo(() => {
    const calculatedData = processCalculatedPlanningData(planningData, stores, skus, weeks);
    
    const groupedData = calculatedData.reduce((acc, row) => {
      const key = `${row.storeId}-${row.skuId}`;
      if (!acc[key]) {
        acc[key] = {
          storeLabel: row.storeLabel,
          skuLabel: row.skuLabel
        };
      }

      acc[key][`salesUnits_${row.weekId}`] = row.salesUnits;
      acc[key][`salesDollars_${row.weekId}`] = row.salesDollars;
      acc[key][`gmDollars_${row.weekId}`] = row.gmDollars;
      acc[key][`gmPercentage_${row.weekId}`] = row.gmPercentage;

      return acc;
    }, {} as Record<string, any>);

    return Object.values(groupedData);
  }, [planningData, stores, skus, weeks]);

  return (
    <Box className="ag-theme-alpine" sx={GRID_CONTAINER_STYLE}>
      {isLoading && <GridLoader />}
      <AgGridReact
        {...GRID_PROPS}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        cellSelection={true}
        onCellValueChanged={onCellValueChanged}
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

export default React.memo(PlanningGrid); 
