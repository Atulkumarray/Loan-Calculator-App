import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  height: '400px',
  width: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  boxSizing: 'border-box',
}));

const AmortizationSchedule = ({ principal, annualRate, years, currency }) => {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);

  const schedule = [];
  let balance = principal;

  for (let month = 1; month <= months; month++) {
    const interest = balance * monthlyRate;
    const principalPayment = monthlyPayment - interest;
    balance -= principalPayment;

    schedule.push({
      month,
      payment: monthlyPayment.toFixed(2),
      principal: principalPayment.toFixed(2),
      interest: interest.toFixed(2),
      balance: balance > 0 ? balance.toFixed(2) : 0,
    });
  }

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          backgroundColor: '#F4F4F4',
          color: '#000000',
          padding: '8px',
          textAlign: 'left',
        }}
        gutterBottom
      >
        Amortization Schedule ({currency})
      </Typography>
      <StyledTableContainer component={Paper} sx={{ backgroundColor: '#F4F4F4' }}>
        <Table stickyHeader sx={{ tableLayout: 'fixed', width: '100%', borderCollapse: 'collapse' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '25%', border: '1px solid #ddd', padding: '8px', fontWeight: 'bold', textAlign: 'left' }}>Month</TableCell>
              <TableCell sx={{ width: '25%', border: '1px solid #ddd', padding: '8px', fontWeight: 'bold', textAlign: 'right' }}>Principal ({currency})</TableCell>
              <TableCell sx={{ width: '25%', border: '1px solid #ddd', padding: '8px', fontWeight: 'bold', textAlign: 'right' }}>Interest ({currency})</TableCell>
              <TableCell sx={{ width: '25%', border: '1px solid #ddd', padding: '8px', fontWeight: 'bold', textAlign: 'right' }}>Remaining Balance ({currency})</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((row) => (
              <TableRow key={row.month}>
                <TableCell sx={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>{row.month}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{row.principal}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{row.interest}</TableCell>
                <TableCell sx={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{row.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
};

export default AmortizationSchedule;