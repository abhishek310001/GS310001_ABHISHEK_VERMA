import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from '../types';
import { sampleStores } from '../utils/sampleData';

interface StoreState {
  stores: Store[];
}

const initialState: StoreState = {
  stores: sampleStores,
};

export const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<{ label: string; city: string; stateCode: string }>) => {
      const { label, city, stateCode } = action.payload;
      const maxSeqNo = Math.max(...state.stores.map((store: Store) => store.seqNo), 0);
      const maxId = Math.max(...state.stores.map((store: Store) => parseInt(store.id.replace('ST', ''))), 0);
      state.stores.push({
        id: `ST${String(maxId + 1).padStart(3, '0')}`,
        seqNo: maxSeqNo + 1,
        label,
        city,
        state: stateCode
      });
    },
    updateStore: (state, action: PayloadAction<{ id: string; label: string; city: string; stateCode: string }>) => {
      const { id, label, city, stateCode } = action.payload;
      const storeIndex = state.stores.findIndex(store => store.id === id);
      if (storeIndex !== -1) {
        state.stores[storeIndex] = {
          ...state.stores[storeIndex],
          label,
          city,
          state: stateCode
        };
      }
    },
    deleteStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter(store => store.id !== action.payload);
    },
    reorderStores: (state, action: PayloadAction<Store[]>) => {
      state.stores = action.payload.map((store, index) => ({
        ...store,
        seqNo: index + 1
      }));
    },
  },
});

export const { addStore, updateStore, deleteStore, reorderStores } = storeSlice.actions;

export default storeSlice.reducer; 
