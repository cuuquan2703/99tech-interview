import React, { useState } from 'react';

interface Transaction {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: Date;
  txHash: string;
  fee: number;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    fromCurrency: 'BUSD',
    toCurrency: 'MATIC',
    fromAmount: 1945.58,
    toAmount: 842.31,
    status: 'completed',
    timestamp: new Date('2024-01-15T10:30:00'),
    txHash: '0x1234...5678',
    fee: 2.48
  },
  {
    id: '2',
    fromCurrency: 'ETH',
    toCurrency: 'USDC',
    fromAmount: 2.5,
    toAmount: 8125.00,
    status: 'completed',
    timestamp: new Date('2024-01-14T15:45:00'),
    txHash: '0x8765...4321',
    fee: 5.20
  },
  {
    id: '3',
    fromCurrency: 'SOL',
    toCurrency: 'USDT',
    fromAmount: 50.0,
    toAmount: 4922.50,
    status: 'pending',
    timestamp: new Date('2024-01-15T09:15:00'),
    txHash: '0x9876...5432',
    fee: 1.80
  },
  {
    id: '4',
    fromCurrency: 'BTC',
    toCurrency: 'ETH',
    fromAmount: 0.1,
    toAmount: 1.54,
    status: 'failed',
    timestamp: new Date('2024-01-13T22:20:00'),
    txHash: '0x5432...1098',
    fee: 8.50
  },
  {
    id: '5',
    fromCurrency: 'USDC',
    toCurrency: 'LINK',
    fromAmount: 1000.0,
    toAmount: 81.04,
    status: 'completed',
    timestamp: new Date('2024-01-12T14:30:00'),
    txHash: '0x2109...8765',
    fee: 2.10
  },
  {
    id: '6',
    fromCurrency: 'MATIC',
    toCurrency: 'BUSD',
    fromAmount: 1000.0,
    toAmount: 1251.47,
    status: 'completed',
    timestamp: new Date('2024-01-11T11:00:00'),
    txHash: '0x6543...2109',
    fee: 1.95
  }
];

function History() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesSearch = 
      transaction.fromCurrency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.toCurrency.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.txHash.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-900 text-green-300';
      case 'pending':
        return 'bg-yellow-900 text-yellow-300';
      case 'failed':
        return 'bg-red-900 text-red-300';
      default:
        return 'bg-gray-900 text-gray-300';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Transaction History</h1>
          <p className="text-gray-400 text-lg">
            View all your cryptocurrency swap transactions
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'all'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('completed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'completed'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'pending'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setStatusFilter('failed')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  statusFilter === 'failed'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Failed
              </button>
            </div>
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by currency or transaction hash..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-green-500 focus:outline-none"
              />
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Fee
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">🔄</span>
                          <div>
                            <div className="text-white font-medium">
                              {transaction.fromAmount} {transaction.fromCurrency} → {transaction.toAmount} {transaction.toCurrency}
                            </div>
                            <div className="text-gray-400 text-sm font-mono">
                              {transaction.txHash}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-white">
                        <div className="font-medium">{transaction.fromAmount} {transaction.fromCurrency}</div>
                        <div className="text-gray-400 text-sm">→ {transaction.toAmount} {transaction.toCurrency}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {formatDate(transaction.timestamp)}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      ${transaction.fee}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="text-gray-400 text-sm font-medium">Total Transactions</div>
            <div className="text-2xl font-bold text-white">{mockTransactions.length}</div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="text-gray-400 text-sm font-medium">Completed</div>
            <div className="text-2xl font-bold text-green-400">
              {mockTransactions.filter(t => t.status === 'completed').length}
            </div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="text-gray-400 text-sm font-medium">Pending</div>
            <div className="text-2xl font-bold text-yellow-400">
              {mockTransactions.filter(t => t.status === 'pending').length}
            </div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="text-gray-400 text-sm font-medium">Total Fees</div>
            <div className="text-2xl font-bold text-white">
              ${mockTransactions.reduce((sum, t) => sum + t.fee, 0).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
