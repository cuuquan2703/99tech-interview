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

export interface CurrencyContextType {
  currencies: Currency[];
  exchangeRates: ExchangeRate[];
  isLoading: boolean;
  error: string | null;
  getCurrencyBySymbol: (symbol: string) => Currency | undefined;
  getExchangeRate: (from: string, to: string) => number | null;
  refreshPrices: () => Promise<void>;
}