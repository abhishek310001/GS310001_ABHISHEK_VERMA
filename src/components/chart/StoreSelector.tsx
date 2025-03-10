import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Store } from '../../types';

interface StoreSelectorProps {
  stores: Store[];
  selectedStore: string;
  onChange: (event: SelectChangeEvent) => void;
}

const StoreSelector: React.FC<StoreSelectorProps> = ({
  stores,
  selectedStore,
  onChange
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="store-select-label">Select Store</InputLabel>
      <Select
        labelId="store-select-label"
        id="store-select"
        value={selectedStore}
        label="Select Store"
        onChange={onChange}
      >
        <MenuItem value="">
          <em>Select a store</em>
        </MenuItem>
        {stores.map(store => (
          <MenuItem key={store.id} value={store.id}>
            {store.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default React.memo(StoreSelector); 
