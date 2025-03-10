import { useMemo } from 'react';
import { Store, SKU, Week, PlanningData, CalculatedPlanningData } from '../../types';
import { processCalculatedPlanningData } from '../../utils/calculations';

export const usePlanningData = (
  planningData: PlanningData[],
  stores: Store[],
  skus: SKU[],
  weeks: Week[]
) => {
  return useMemo(() => {
    const calculatedData = processCalculatedPlanningData(planningData, stores, skus, weeks);
    
    const groupedData = calculatedData.reduce((acc: Record<string, any>, row: CalculatedPlanningData) => {
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
}; 
