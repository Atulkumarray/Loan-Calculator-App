import React from 'react';
import { Typography, Container, Paper } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          About This App
        </Typography>
        <Typography variant="body1" paragraph>
          This Loan Calculator App allows users to compute EMIs (Equated Monthly Installments)
          using loan amount, interest rate, and term. It also provides a detailed amortization schedule
          and real-time currency conversions using live exchange rates.
        </Typography>
        <Typography variant="body1" paragraph>
          Built with React and Material UI, the app features dark/light mode, responsive design, and
          a live Exchange Rate API for currency conversion.
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;
