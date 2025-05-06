import React, { useState, Component } from 'react';
import { TextField, Button, Typography, Grid, FormControl, Select, MenuItem, InputLabel, Alert, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import useEMICalculator from '../JS/useEMICalculator.js';
import useExchangeRates from '../hooks/useExchangeRates.js';
import { useCurrency } from '../context/CurrencyContext';

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

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  backgroundColor: '#0056b3',
  '&:hover': {
    backgroundColor: '#003d82',
  },
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const ResetButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2), // Increased padding for larger size
  fontWeight: 'bold',
  fontSize: '1.1rem', // Larger font size
  minWidth: '150px', // Minimum width to make button wider
  marginLeft: 'auto', // Force to right end
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0, // Reset for mobile
    minWidth: '100%', // Full width on mobile
  },
}));

const CurrencySelector = styled(FormControl)(({ theme }) => ({
  minWidth: 120,
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const LoanForm = ({ onCalculate, onReset, emiData }) => {
  const [principal, setPrincipal] = useState('100000');
  const [interestRate, setInterestRate] = useState('8.5');
  const [term, setTerm] = useState('5');

  const { currency, changeCurrency } = useCurrency();
  const { rates, loading, error } = useExchangeRates('INR');
  const emi = useEMICalculator(principal, interestRate, term);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emi || isNaN(emi)) {
      alert('Please enter valid values.');
      return;
    }

    let convertedEMI = emi;
    let selectedCurrency = currency;

    if (!loading && !error && rates) {
      const rateToINR = rates['INR'] || 1;
      const rateToSelected = rates[currency] || 1;
      const conversionRate = rateToSelected / rateToINR;
      convertedEMI = (emi * conversionRate).toFixed(2);
    } else {
      selectedCurrency = 'INR';
    }

    onCalculate({
      emi: convertedEMI,
      principal,
      interestRate,
      term,
      currency: selectedCurrency,
    });
  };

  const handleReset = () => {
    setPrincipal('100000');
    setInterestRate('8.5');
    setTerm('5');
    onReset();
  };

  return (
    <ErrorBoundary>
    <Box
      sx={{
        maxWidth: '600px',
        ml: 0,
        mr: 'auto',
        pl: '120px',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Typography variant="h4" align="left" gutterBottom sx={{ mt: 2 }}>
        Loan Calculator Dashboard
      </Typography>
      {error && (
        <Alert severity="warning" sx={{ mb: 2, maxWidth: '600px' }}>
          Exchange rates unavailable. Displaying EMI in INR.
        </Alert>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
        <Grid container spacing={2} sx={{ maxWidth: '600px' }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Loan Amount"
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              required
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Interest Rate (%)"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              required
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Term (Years)"
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              required
              variant="outlined"
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mt: 2 }}>
        <StyledButton variant="contained" onClick={handleSubmit}>
          CALCULATE
        </StyledButton>
        {emiData && (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                width: '100%',
                mt: 2,
              }}
            >
              <Typography variant="h6">
                Monthly EMI: ${emiData.emi} {emiData.currency}
              </Typography>
            </Box>

            {/* This Box spans full page width and separates selector and reset */}
           {/* Full-width container */}
<Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100vw', // full page width
    padding: '0 24px',
    marginTop: 3,
    boxSizing: 'border-box',
  }}
>
  {/* Currency Selector on left */}
  <Box sx={{ maxWidth: 200 ,marginLeft:'-28px'}}>
    <CurrencySelector variant="outlined" size="small" fullWidth>
      <InputLabel id="currency-label">Currency</InputLabel>
      <Select
        labelId="currency-label"
        value={currency}
        onChange={(e) => changeCurrency(e.target.value)}
        label="Currency"
      >
        <MenuItem value="USD">USD</MenuItem>
        <MenuItem value="EUR">EUR</MenuItem>
        <MenuItem value="INR">INR</MenuItem>
        <MenuItem value="GBP">GBP</MenuItem>
        <MenuItem value="JPY">JPY</MenuItem>
        <MenuItem value="AUD">AUD</MenuItem>
        <MenuItem value="CAD">CAD</MenuItem>
      </Select>
    </CurrencySelector>
  </Box>

  {/* Reset Button on far right */}
  <ResetButton
    variant="outlined"
    color="secondary"
    onClick={handleReset}
    size="small"
    sx={{
      padding: '12px 8px',// Consistent padding for rectangular shape
      fontSize: '0.9rem',  // Larger font size
      fontWeight: 500,  // Ensure text is not bold
      marginRight: 36,
      
       color: '#9C27B0',
      borderRadius: '4px',  // Sharp rectangular corners
    }}
  >
    RESET TABLE
  </ResetButton>
</Box>

          </>
        )}
      </Box>
    </Box>
  </ErrorBoundary>

  );
};

export default LoanForm;