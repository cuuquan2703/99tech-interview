import React, { createContext, useContext, useLayoutEffect, useState, type ReactNode } from 'react';
import { type CurrencyPrice, type Currency, type ExchangeRate, type CurrencyContextType } from '../types/CurrencyContext';

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchCurrencyPrices = async (): Promise<CurrencyPrice[]> => {
    try {
      const response = await fetch('https://interview.switcheo.com/prices.json');
      if (!response.ok) {
        throw new Error('Failed to fetch currency prices');
      }
      const data: CurrencyPrice[] = await response.json();
      return data;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to fetch currency prices');
    }
  };

  const processCurrencyPrices = (prices: CurrencyPrice[]): Currency[] => {
    const currencyMap = new Map<string, CurrencyPrice>();
    
    prices.forEach(price => {
      const existing = currencyMap.get(price.currency);
      if (!existing || new Date(price.date) > new Date(existing.date)) {
        currencyMap.set(price.currency, price);
      }
    });

    return Array.from(currencyMap.values()).map(price => ({
      symbol: price.currency,
      name: price.currency,
      price: price.price,
      lastUpdated: price.date
    }));
  };

  const calculateExchangeRates = (currencies: Currency[]): ExchangeRate[] => {
    const rates: ExchangeRate[] = [];
    
    for (let i = 0; i < currencies.length; i++) {
      for (let j = 0; j < currencies.length; j++) {
        if (i !== j) {
          const from = currencies[i];
          const to = currencies[j];
          const rate = from.price / to.price;
          
          rates.push({
            from: from.symbol,
            to: to.symbol,
            rate,
            fromPrice: from.price,
            toPrice: to.price
          });
        }
      }
    }
    
    return rates;
  };

  const initializeCurrencyData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const prices = await fetchCurrencyPrices();
      const processedCurrencies = processCurrencyPrices(prices);
      const calculatedRates = calculateExchangeRates(processedCurrencies);
      
      setCurrencies(processedCurrencies);
      setExchangeRates(calculatedRates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize currency data');
      console.error('Currency initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshPrices = async () => {
    await initializeCurrencyData();
  };

  const getCurrencyBySymbol = (symbol: string): Currency | undefined => {
    return currencies.find(currency => currency.symbol === symbol);
  };

  const getExchangeRate = (from: string, to: string): number | null => {
    const rate = exchangeRates.find(
      r => r.from === from && r.to === to
    );
    return rate ? rate.rate : null;
  };

  useLayoutEffect(() => {
    initializeCurrencyData();
  },[]);

  const value: CurrencyContextType = {
    currencies,
    exchangeRates,
    isLoading,
    error,
    getCurrencyBySymbol,
    getExchangeRate,
    refreshPrices
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};
