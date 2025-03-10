import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlanningData, Week } from '../types';
import { sampleWeeks, samplePlanningData } from '../utils/sampleData';

interface PlanningState {
  planningData: PlanningData[];
  weeks: Week[];
}

const initialState: PlanningState = {
  planningData: samplePlanningData,
  weeks: sampleWeeks,
};

export const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    initializePlanningData: (state, action: PayloadAction<PlanningData[]>) => {
      state.planningData = action.payload;
    },
    updateSalesUnits: (
      state,
      action: PayloadAction<{ storeId: string; skuId: string; weekId: string; salesUnits: number }>
    ) => {
      const { storeId, skuId, weekId, salesUnits } = action.payload;
      const existingDataIndex = state.planningData.findIndex(
        data => data.storeId === storeId && data.skuId === skuId && data.weekId === weekId
      );

      if (existingDataIndex >= 0) {
        state.planningData[existingDataIndex].salesUnits = salesUnits;
      } else {
        state.planningData.push({ storeId, skuId, weekId, salesUnits });
      }
    },
    // Remove planning data for a specific store
    removePlanningDataForStore: (state, action: PayloadAction<string>) => {
      state.planningData = state.planningData.filter(data => data.storeId !== action.payload);
    },
    // Remove planning data for a specific SKU
    removePlanningDataForSKU: (state, action: PayloadAction<string>) => {
      state.planningData = state.planningData.filter(data => data.skuId !== action.payload);
    },
  },
});

export const { 
  initializePlanningData, 
  updateSalesUnits, 
  removePlanningDataForStore, 
  removePlanningDataForSKU 
} = planningSlice.actions;

export default planningSlice.reducer;
