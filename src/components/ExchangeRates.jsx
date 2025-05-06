import React, { Component } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import useExchangeRates from '../hooks/useExchangeRates.js';

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Typography color="error" align="center">
          Something went wrong. Please try again.
        </Typography>
      );
    }
    return this.props.children;
  }
}

const StyledContainer = styled(Box)(({ theme }) => ({
  marginTop: '50px',
  padding: '20px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.down('sm')]: {
    padding: '10px',
    margin: '20px',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: '20px',
}));

const ExchangeRates = () => {
  const { rates, loading, error } = useExchangeRates('INR');

  return (
    <ErrorBoundary>
      <StyledContainer>
        <Typography variant="h4" align="center" gutterBottom>
          Exchange Rates (Base: INR)
        </Typography>
        {loading && (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        {!loading && !error && rates && (
          <StyledTableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">Currency</Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">Rate</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(rates).map(([currency, rate]) => (
                  <TableRow key={currency}>
                    <TableCell>{currency}</TableCell>
                    <TableCell align="right">{rate.toFixed(4)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </StyledTableContainer>
        )}
      </StyledContainer>
    </ErrorBoundary>
  );
};

export default ExchangeRates;