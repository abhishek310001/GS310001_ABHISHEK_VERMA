import { CalculatedPlanningData, PlanningData, SKU, Store, Week } from "../types";

// Calculate sales dollars
export const calculateSalesDollars = (salesUnits: number, price: number): number => {
  return salesUnits * price;
};

// Calculate GM dollars
export const calculateGMDollars = (salesDollars: number, salesUnits: number, cost: number): number => {
  return salesDollars - (salesUnits * cost);
};

// Calculate GM percentage
export const calculateGMPercentage = (gmDollars: number, salesDollars: number): number => {
  if (salesDollars === 0) return 0;
  return (gmDollars / salesDollars) * 100;
};

// Get GM percentage color based on value
export const getGMPercentageColor = (gmPercentage: number): string => {
    if (gmPercentage >= 40) return '#4CAF50'; // Green
    if (gmPercentage >= 10) return '#FFEB3B'; // Yellow
    if (gmPercentage > 5) return '#FF9800';  // Orange
    return '#F44336'; // Red
  };

// Process planning data to include calculated fields
export const processCalculatedPlanningData = (
    planningData: PlanningData[],
    stores: Store[],
    skus: SKU[],
    weeks: Week[]
  ): CalculatedPlanningData[] => {
    return planningData.map(data => {
      const store = stores.find(s => s.id === data.storeId)!;
      const sku = skus.find(s => s.id === data.skuId)!;
      const week = weeks.find(w => w.id === data.weekId)!;
  
      const salesDollars = calculateSalesDollars(data.salesUnits, sku.price);
      const gmDollars = calculateGMDollars(salesDollars, data.salesUnits, sku.cost);
      const gmPercentage = calculateGMPercentage(gmDollars, salesDollars);
  
      return {
        storeId: store.id,
        storeLabel: store.label,
        skuId: sku.id,
        skuLabel: sku.label,
        weekId: week.id,
        weekLabel: week.weekLabel,
        monthLabel: week.monthLabel,
        salesUnits: data.salesUnits,
        salesDollars,
        gmDollars,
        gmPercentage,
        price: sku.price,
        cost: sku.cost
      };
    });
  }; 
