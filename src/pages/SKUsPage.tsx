import React, { useState, useCallback, useMemo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { addSKU, updateSKU, deleteSKU } from '../redux/skuSlice';
import { SKU } from '../types';
import SKUDialog from '../components/skus/SKUDialog';
import SKUsGrid from '../components/skus/SKUsGrid';

interface SKUFormData {
  label: string;
  skuClass: string;
  department: string;
  price: string;
  cost: string;
}

const initialFormData: SKUFormData = {
  label: '',
  skuClass: '',
  department: '',
  price: '',
  cost: ''
};

const SKUsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { skus } = useAppSelector(state => state.skus);
  const [isLoading, setIsLoading] = useState(true);
  
  const [dialogState, setDialogState] = useState({
    open: false,
    isEditing: false,
    currentSKU: null as SKU | null,
    formData: initialFormData
  });

  const handleOpen = useCallback(() => {
    setDialogState(prev => ({
      ...prev,
      open: true
    }));
  }, []);

  const handleClose = useCallback(() => {
    setDialogState({
      open: false,
      isEditing: false,
      currentSKU: null,
      formData: initialFormData
    });
  }, []);

  const handleFieldChange = useCallback((field: keyof SKUFormData, value: string) => {
    setDialogState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value
      }
    }));
  }, []);

  const handleSave = useCallback(() => {
    const { formData, isEditing, currentSKU } = dialogState;
    const { label, skuClass, department, price, cost } = formData;

    if (label.trim() && skuClass.trim() && department.trim() && price && cost) {
      const skuData = {
        label,
        class: skuClass,
        department,
        price: parseFloat(price),
        cost: parseFloat(cost)
      };

      if (isEditing && currentSKU) {
        dispatch(updateSKU({ id: currentSKU.id, ...skuData }));
      } else {
        dispatch(addSKU(skuData));
      }
      handleClose();
    }
  }, [dialogState, dispatch]);

  const handleEditSKU = useCallback((sku: SKU) => {
    setDialogState({
      open: true,
      isEditing: true,
      currentSKU: sku,
      formData: {
        label: sku.label,
        skuClass: sku.class,
        department: sku.department,
        price: sku.price.toString(),
        cost: sku.cost.toString()
      }
    });
  }, []);

  const handleDeleteSKU = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to delete this SKU?')) {
      dispatch(deleteSKU(id));
    }
  }, [dispatch]);

  const gridProps = useMemo(() => ({
    skus,
    isLoading,
    onEditSKU: handleEditSKU,
    onDeleteSKU: handleDeleteSKU,
    setIsLoading
  }), [skus, isLoading, handleEditSKU, handleDeleteSKU]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">SKUs</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleOpen}
        >
          Add SKU
        </Button>
      </Box>

      <SKUsGrid {...gridProps} />

      <SKUDialog
        open={dialogState.open}
        isEditing={dialogState.isEditing}
        sku={dialogState.formData}
        onClose={handleClose}
        onSave={handleSave}
        onFieldChange={handleFieldChange}
      />
    </Box>
  );
};

export default SKUsPage; 
