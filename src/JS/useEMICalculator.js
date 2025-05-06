import { useMemo } from 'react';

const useEMICalculator = (principal, annualRate, years) => {
  const EMI = useMemo(() => {
    const P = Number(principal);
    const R = Number(annualRate) / 12 / 100;
    const N = Number(years) * 12;

    if (!P || !R || !N) return 0;

    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    return emi.toFixed(2);
  }, [principal, annualRate, years]);

  return EMI;
};

export default useEMICalculator;