import React, { useCallback, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material';

interface SKUFormData {
  label: string;
  skuClass: string;
  department: string;
  price: string;
  cost: string;
}

interface SKUDialogProps {
  open: boolean;
  isEditing: boolean;
  sku: SKUFormData;
  onClose: () => void;
  onSave: () => void;
  onFieldChange: (field: keyof SKUFormData, value: string) => void;
}

const SKUDialog: React.FC<SKUDialogProps> = ({
  open,
  isEditing,
  sku,
  onClose,
  onSave,
  onFieldChange
}) => {
  const handleChange = useCallback((field: keyof SKUFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    requestAnimationFrame(() => {
      onFieldChange(field, value);
    });
  }, [onFieldChange]);

  const isSaveDisabled = useMemo(() => {
    return !sku.label.trim() || 
           !sku.skuClass.trim() || 
           !sku.department.trim() || 
           !sku.price || 
           !sku.cost;
  }, [sku]);

  const textFields = useMemo(() => [
    { field: 'label' as const, label: 'Label', type: 'text', autoFocus: true },
    { field: 'skuClass' as const, label: 'Class', type: 'text', autoFocus: false },
    { field: 'department' as const, label: 'Department', type: 'text', autoFocus: false },
    { field: 'price' as const, label: 'Price', type: 'number', autoFocus: false },
    { field: 'cost' as const, label: 'Cost', type: 'number', autoFocus: false }
  ], []);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      keepMounted={false}
    >
      <DialogTitle>{isEditing ? 'Edit SKU' : 'Add SKU'}</DialogTitle>
      <DialogContent>
        {textFields.map(({ field, label, type, autoFocus }) => (
          <TextField
            key={field}
            autoFocus={autoFocus}
            margin="dense"
            label={label}
            type={type}
            fullWidth
            value={sku[field]}
            onChange={handleChange(field)}
            slotProps={{
                input: {
                    inputProps: {
                        step: type === 'number' ? '0.01' : undefined,
                        min: type === 'number' ? '0' : undefined
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

export default React.memo(SKUDialog); 
