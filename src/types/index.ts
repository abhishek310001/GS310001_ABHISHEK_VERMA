// Define types for our application

// Store type
export interface Store {
    id: string;
    seqNo: number;
    label: string;
    city: string;
    state: string;
  }

// SKU type
export interface SKU {
    id: string;
    label: string;
    class: string;
    department: string;
    price: number;
    cost: number;
  }

// Calendar type
export interface Week {
  id: string;
  seqNo: number;
  weekLabel: string;
  monthId: string;
  monthLabel: string;
}

// Planning data type
export interface PlanningData {
  storeId: string;
  skuId: string;
  weekId: string;
  salesUnits: number;
}

// Calculated planning data
export interface CalculatedPlanningData {
  storeId: string;
  storeLabel: string;
  skuId: string;
  skuLabel: string;
  weekId: string;
  weekLabel: string;
  monthLabel: string;
  salesUnits: number;
  salesDollars: number;
  gmDollars: number;
  gmPercentage: number;
  price: number;
  cost: number;
} 
