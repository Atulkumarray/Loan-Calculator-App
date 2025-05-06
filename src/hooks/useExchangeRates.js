import { useState, useEffect } from 'react';
import axios from 'axios';

const useExchangeRates = (baseCurrency = 'USD') => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(`useExchangeRates: Fetching rates for baseCurrency=${baseCurrency}`);
    const fetchExchangeRates = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/1b2e58e20f1bbe062bec809a/latest/${baseCurrency}`);
        if (response.data.result === 'success') {
          setRates(response.data.conversion_rates);
          console.log('useExchangeRates: Successfully fetched rates', response.data.conversion_rates);
        } else {
          throw new Error('API response unsuccessful');
        }
      } catch (err) {
        console.error('useExchangeRates: Error fetching rates', err);
        setError('Failed to fetch exchange rates.');
      } finally {
        setLoading(false);
        console.log('useExchangeRates: Loading complete, error=', error);
      }
    };

    fetchExchangeRates();
  }, [baseCurrency]);

  return { rates, loading, error };
};

export default useExchangeRates;