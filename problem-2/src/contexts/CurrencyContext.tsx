import React, { createContext, useContext, useLayoutEffect, useState, ReactNode } from 'react';

// Types for currency data
export interface CurrencyPrice {
  currency: string;
  date: string;
  price: number;
}

export interface Currency {
  symbol: string;
  name: string;
  price: number;
  lastUpdated: string;
}

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  fromPrice: number;
  toPrice: number;
}

interface CurrencyContextType {
  currencies: Currency[];
  exchangeRates: ExchangeRate[];
  isLoading: boolean;
  error: string | null;
  getCurrencyBySymbol: (symbol: string) => Currency | undefined;
  getExchangeRate: (from: string, to: string) => number | null;
  refreshPrices: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

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

  // Fetch currency prices from API
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

  // Process currency prices and create currency objects
  const processCurrencyPrices = (prices: CurrencyPrice[]): Currency[] => {
    const currencyMap = new Map<string, CurrencyPrice>();
    
    // Get the latest price for each currency
    prices.forEach(price => {
      const existing = currencyMap.get(price.currency);
      if (!existing || new Date(price.date) > new Date(existing.date)) {
        currencyMap.set(price.currency, price);
      }
    });

    return Array.from(currencyMap.values()).map(price => ({
      symbol: price.currency,
      name: price.currency, // You can extend this with full names if needed
      price: price.price,
      lastUpdated: price.date
    }));
  };

  // Calculate exchange rates between all currency pairs
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

  // Initialize currency data
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

  // Refresh prices
  const refreshPrices = async () => {
    await initializeCurrencyData();
  };

  // Get currency by symbol
  const getCurrencyBySymbol = (symbol: string): Currency | undefined => {
    return currencies.find(currency => currency.symbol === symbol);
  };

  // Get exchange rate between two currencies
  const getExchangeRate = (from: string, to: string): number | null => {
    const rate = exchangeRates.find(
      r => r.from === from && r.to === to
    );
    return rate ? rate.rate : null;
  };

  // Use useLayoutEffect to fetch data before DOM mount
  useLayoutEffect(() => {
    initializeCurrencyData();
  }, []);

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
