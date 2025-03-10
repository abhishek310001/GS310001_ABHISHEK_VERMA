import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const GridLoader: React.FC = () => {
  return (
    <Box 
      sx={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        zIndex: 999
      }}
    >
      <CircularProgress size={40} />
      <Typography variant="body1" sx={{ mt: 2 }}>
        Loading data...
      </Typography>
    </Box>
  );
};

export default GridLoader; 
