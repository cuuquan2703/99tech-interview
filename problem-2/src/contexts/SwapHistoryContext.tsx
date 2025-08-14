import React, { createContext, useContext, useState, type ReactNode } from 'react';
import { type SwapTransaction, type SwapHistoryContextType } from '../types/TSwapHistory';

const SwapHistoryContext = createContext<SwapHistoryContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useSwapHistory = () => {
  const context = useContext(SwapHistoryContext);
  if (!context) {
    throw new Error('useSwapHistory must be used within a SwapHistoryProvider');
  }
  return context;
};

interface SwapHistoryProviderProps {
  children: ReactNode;
}

export const SwapHistoryProvider: React.FC<SwapHistoryProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<SwapTransaction[]>([]);

  // Generate unique ID for transactions
  const generateId = (): string => {
    return `swap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Add new transaction to history
  const addTransaction = (transactionData: Omit<SwapTransaction, 'id' | 'timestamp'>) => {
    const newTransaction: SwapTransaction = {
      ...transactionData,
      id: generateId(),
      timestamp: new Date(),
    };

    setTransactions(prev => [newTransaction, ...prev]); // Add to beginning for newest first
  };

  // Clear all transaction history
  const clearHistory = () => {
    setTransactions([]);
  };

  // Get transaction by ID
  const getTransactionById = (id: string): SwapTransaction | undefined => {
    return transactions.find(transaction => transaction.id === id);
  };

  // Get transactions filtered by currency
  const getTransactionsByCurrency = (currency: string): SwapTransaction[] => {
    return transactions.filter(transaction => 
      transaction.fromCurrency === currency || transaction.toCurrency === currency
    );
  };

  const value: SwapHistoryContextType = {
    transactions,
    addTransaction,
    clearHistory,
    getTransactionById,
    getTransactionsByCurrency,
  };

  return (
    <SwapHistoryContext.Provider value={value}>
      {children}
    </SwapHistoryContext.Provider>
  );
};
