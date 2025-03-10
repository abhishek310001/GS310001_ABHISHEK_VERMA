import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SKU } from '../types';
import { sampleSKUs } from '../utils/sampleData';

interface SKUState {
  skus: SKU[];
}

const initialState: SKUState = {
  skus: sampleSKUs,
};

export const skuSlice = createSlice({
  name: 'skus',
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<{ label: string; class: string; department: string; price: number; cost: number }>) => {
      const { label, class: skuClass, department, price, cost } = action.payload;
      const maxId = Math.max(...state.skus.map(sku => parseInt(sku.id.replace('SK', ''))), 0);
      state.skus.push({
        id: `SK${String(maxId + 1).padStart(5, '0')}`,
        label,
        class: skuClass,
        department,
        price,
        cost
      });
    },
    updateSKU: (state, action: PayloadAction<{ id: string; label: string; class: string; department: string; price: number; cost: number }>) => {
      const { id, label, class: skuClass, department, price, cost } = action.payload;
      const skuIndex = state.skus.findIndex(sku => sku.id === id);
      if (skuIndex !== -1) {
        state.skus[skuIndex] = {
          ...state.skus[skuIndex],
          label,
          class: skuClass,
          department,
          price,
          cost
        };
      }
    },
    deleteSKU: (state, action: PayloadAction<string>) => {
      state.skus = state.skus.filter(sku => sku.id !== action.payload);
    },
  },
});

export const { addSKU, updateSKU, deleteSKU } = skuSlice.actions;

export default skuSlice.reducer; 
