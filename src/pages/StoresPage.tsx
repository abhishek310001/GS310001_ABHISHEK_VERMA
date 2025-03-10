import React, { useState, useCallback, useMemo } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ClientSideRowModelModule, RowDragModule, ModuleRegistry, provideGlobalGridOptions, RowDragEndEvent } from 'ag-grid-community';
import { Store } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addStore, updateStore, deleteStore, reorderStores } from '../redux/storeSlice';
import StoreDialog from '../components/stores/StoreDialog';
import StoresGrid from '../components/stores/StoresGrid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([ClientSideRowModelModule, RowDragModule]);

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: "legacy" });

interface StoreFormData {
  label: string;
  city: string;
  stateCode: string;
}

const initialFormData: StoreFormData = {
  label: '',
  city: '',
  stateCode: ''
};

const StoresPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stores } = useAppSelector(state => state.stores);
  const [isLoading, setIsLoading] = useState(true);
  
  const [dialogState, setDialogState] = useState({
    open: false,
    isEditing: false,
    currentStore: null as Store | null,
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
      currentStore: null,
      formData: initialFormData
    });
  }, []);

  const handleFieldChange = useCallback((field: keyof StoreFormData, value: string) => {
    setDialogState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value
      }
    }));
  }, []);

  const handleSave = useCallback(() => {
    const { formData, isEditing, currentStore } = dialogState;
    const { label, city, stateCode } = formData;

    if (label.trim() && city.trim() && stateCode.trim()) {
      if (isEditing && currentStore) {
        dispatch(updateStore({ 
          id: currentStore.id, 
          label, 
          city, 
          stateCode 
        }));
      } else {
        dispatch(addStore({ label, city, stateCode }));
      }
      handleClose();
    }
  }, [dialogState, dispatch]);

  const handleEditStore = useCallback((store: Store) => {
    setDialogState({
      open: true,
      isEditing: true,
      currentStore: store,
      formData: {
        label: store.label,
        city: store.city,
        stateCode: store.state
      }
    });
  }, []);

  const handleDeleteStore = useCallback((id: string) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      dispatch(deleteStore(id));
    }
  }, [dispatch]);

  const onRowDragEnd = useCallback((event: RowDragEndEvent) => {
    const { node, overNode } = event;
    if (!overNode) return;

    const draggedStore = node.data;
    const targetStore = overNode.data;
    
    const newStores = [...stores].sort((a, b) => a.seqNo - b.seqNo);
    const draggedIndex = newStores.findIndex(store => store.id === draggedStore.id);
    const targetIndex = newStores.findIndex(store => store.id === targetStore.id);
    
    if (draggedIndex === targetIndex) return;

    // Remove the dragged store from its original position
    newStores.splice(draggedIndex, 1);
    // Insert it at the new position
    newStores.splice(targetIndex, 0, draggedStore);
    
    // Update sequence numbers
    const reorderedStores = newStores.map((store, index) => ({
      ...store,
      seqNo: index + 1
    }));
    
    dispatch(reorderStores(reorderedStores));
  }, [stores, dispatch]);

  const gridProps = useMemo(() => ({
    stores,
    isLoading,
    onEditStore: handleEditStore,
    onDeleteStore: handleDeleteStore,
    onRowDragEnd,
    setIsLoading
  }), [stores, isLoading, handleEditStore, handleDeleteStore, onRowDragEnd]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Stores</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          onClick={handleOpen}
        >
          Add Store
        </Button>
      </Box>

      <StoresGrid {...gridProps} />

      <StoreDialog
        open={dialogState.open}
        isEditing={dialogState.isEditing}
        store={dialogState.formData}
        onClose={handleClose}
        onSave={handleSave}
        onFieldChange={handleFieldChange}
      />
    </Box>
  );
};

export default StoresPage; 
