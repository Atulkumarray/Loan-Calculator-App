import React, { useState } from 'react';
import { Box } from '@mui/material';
import LoanForm from '../components/LoanForm';
import AmortizationSchedule from '../components/AmortizationSchedule';

const Home = () => {
  const [emiData, setEmiData] = useState(null);

  const handleCalculate = (data) => {
    setEmiData(data);
  };

  const handleReset = () => {
    setEmiData(null);
  };

  return (
    <Box sx={{ mt: 2, px: { xs: 2, sm: 2 }, overflowX: 'hidden', width: '100%', boxSizing: 'border-box' }}>
      <LoanForm onCalculate={handleCalculate} onReset={handleReset} emiData={emiData} />
      {emiData && (
        <Box sx={{ mt: 3 }}>
          <Box sx={{ width: '100%', maxWidth: 'calc(100% - 240px)', ml: '120px', mr: '120px', textAlign: 'left', boxSizing: 'border-box' }}>
            <AmortizationSchedule
              principal={Number(emiData.principal)}
              annualRate={Number(emiData.interestRate)}
              years={Number(emiData.term)}
              currency={emiData.currency}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;