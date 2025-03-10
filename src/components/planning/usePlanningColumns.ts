import { useMemo } from 'react';
import { CellClassParams } from 'ag-grid-community';
import { Week } from '../../types';
import { COLUMN_WIDTHS, CELL_STYLES, VALUE_FORMATTERS } from '../../constants/gridConstants';
import { getGMPercentageColor } from '../../utils/calculations';

export const usePlanningColumns = (weeks: Week[]) => {
  return useMemo(() => {
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
            cellStyle: CELL_STYLES.numeric
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
}; 
