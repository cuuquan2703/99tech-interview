export interface SwapTransaction {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  exchangeRate: number;
  commission: number;
  timestamp: Date;
  status: 'completed' | 'pending' | 'failed';
}
export interface SwapHistoryContextType {
  transactions: SwapTransaction[];
  addTransaction: (transaction: Omit<SwapTransaction, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  getTransactionById: (id: string) => SwapTransaction | undefined;
  getTransactionsByCurrency: (currency: string) => SwapTransaction[];
}