import React from 'react';
import { Typography, Box } from '@mui/material';

const Result = ({ emi, currency }) => {
  return (
    <Box sx={{ mt: 3, textAlign: 'center' }}>
      <Typography variant="h6">
        Monthly EMI: {emi} {currency}
      </Typography>
    </Box>
  );
};

export default Result;