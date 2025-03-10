import { useMemo } from 'react';
import { Store, SKU, Week, PlanningData } from '../../types';
import { processCalculatedPlanningData } from '../../utils/calculations';

export const useChartData = (
  selectedStore: string,
  planningData: PlanningData[],
  stores: Store[],
  skus: SKU[],
  weeks: Week[]
) => {
  return useMemo(() => {
    if (!selectedStore) return [];

    const calculatedData = processCalculatedPlanningData(planningData, stores, skus, weeks);
    const storeData = calculatedData.filter(data => data.storeId === selectedStore);
    
    const weekData = storeData.reduce((acc, data) => {
      if (!acc[data.weekId]) {
        acc[data.weekId] = {
          weekId: data.weekId,
          weekLabel: data.weekLabel,
          monthLabel: data.monthLabel,
          salesDollars: 0,
          gmDollars: 0,
          gmPercentage: 0,
          totalSales: 0
        };
      }
      
      acc[data.weekId].salesDollars += data.salesDollars;
      acc[data.weekId].gmDollars += data.gmDollars;
      acc[data.weekId].totalSales += data.salesDollars;
      
      return acc;
    }, {} as Record<string, any>);
    
    Object.values(weekData).forEach((week: any) => {
      week.gmPercentage = week.totalSales > 0 
        ? (week.gmDollars / week.totalSales) * 100 
        : 0;
    });
    
    return Object.values(weekData).sort((a: any, b: any) => {
      const weekA = parseInt(a.weekId.replace('W', ''));
      const weekB = parseInt(b.weekId.replace('W', ''));
      return weekA - weekB;
    });
  }, [selectedStore, planningData, stores, skus, weeks]);
}; 
