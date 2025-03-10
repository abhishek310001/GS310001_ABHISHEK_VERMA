import React, { useCallback, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

interface StoreFormData {
  label: string;
  city: string;
  stateCode: string;
}

interface StoreDialogProps {
  open: boolean;
  isEditing: boolean;
  store: StoreFormData;
  onClose: () => void;
  onSave: () => void;
  onFieldChange: (field: keyof StoreFormData, value: string) => void;
}

const StoreDialog: React.FC<StoreDialogProps> = ({
  open,
  isEditing,
  store,
  onClose,
  onSave,
  onFieldChange
}) => {
  const handleChange = useCallback((field: keyof StoreFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    // Use requestAnimationFrame to debounce the update
    requestAnimationFrame(() => {
      onFieldChange(field, value);
    });
  }, [onFieldChange]);

  const isSaveDisabled = useMemo(() => {
    return !store.label.trim() || !store.city.trim() || !store.stateCode.trim();
  }, [store.label, store.city, store.stateCode]);

  const textFields = useMemo(() => [
    { field: 'label' as const, label: 'Label', autoFocus: true },
    { field: 'city' as const, label: 'City', autoFocus: false },
    { field: 'stateCode' as const, label: 'State', autoFocus: false }
  ], []);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      keepMounted={false}
    >
      <DialogTitle>{isEditing ? 'Edit Store' : 'Add Store'}</DialogTitle>
      <DialogContent>
        {textFields.map(({ field, label, autoFocus }) => (
          <TextField
            key={field}
            autoFocus={autoFocus}
            margin="dense"
            label={label}
            type="text"
            fullWidth
            value={store[field]}
            onChange={handleChange(field)}
            slotProps={{
                input: {
                    inputProps: {
                        maxLength: field === 'stateCode' ? 2 : 50
                    }
                }
            }}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={onSave}
          disabled={isSaveDisabled}
        >
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(StoreDialog); 
