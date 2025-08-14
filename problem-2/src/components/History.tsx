/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useSwapHistory } from '../contexts/SwapHistoryContext';
import Search from './Search';
import HistoryStatus from './HistoryStatus';
import HistoryTableRow from './HistoryTableRow';

function History() {
  const { transactions } = useSwapHistory();
  const [fromSearchTerm, setFromSearchTerm] = useState('');
  const [toSearchTerm, setToSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending' | 'failed'>('all');

  // Filter transactions based on search and status
  const filteredTransactions = transactions.filter(transaction => {
    const matchesFromSearch = fromSearchTerm === '' || 
      transaction.fromCurrency.toLowerCase().includes(fromSearchTerm.toLowerCase());
    
    const matchesToSearch = toSearchTerm === '' || 
      transaction.toCurrency.toLowerCase().includes(toSearchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    
    return matchesFromSearch && matchesToSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Swap History</h1>
        </div>

        {/* Controls */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* From Currency Search */}
              <div className="relative flex-1 max-w-md">
                <Search 
                  value={fromSearchTerm} 
                  onChange={setFromSearchTerm} 
                  placeholder="Search from currency..." 
                />
              </div>

              {/* To Currency Search */}
              <div className="relative flex-1 max-w-md">
                <Search 
                  value={toSearchTerm} 
                  onChange={setToSearchTerm} 
                  placeholder="Search destination currency..." 
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-green-500 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <HistoryStatus title="Total Transactions" content={transactions.length.toString()} />
          <HistoryStatus title="Completed" content={transactions.filter(t => t.status === 'completed').length.toString()} />
          <HistoryStatus title="Pending" content={transactions.filter(t => t.status === 'pending').length.toString()} />
          <HistoryStatus title="Failed" content={transactions.filter(t => t.status === 'failed').length.toString()} />
        </div>

        {/* Transactions Table */}
        {filteredTransactions.length === 0 ? (
          <div className="bg-gray-800 rounded-2xl p-12 border border-gray-700 text-center">
            <div className="text-gray-400 text-lg mb-2">
              {transactions.length === 0 ? 'No transactions yet' : 'No transactions match your filters'}
            </div>
            <p className="text-gray-500">
              {transactions.length === 0 
                ? 'Complete your first swap to see transaction history here'
                : 'Try adjusting your search terms or status filter'
              }
            </p>
          </div>
        ) : (
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
                      Exchange Rate
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Commission
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredTransactions.map((transaction) => (
                    <HistoryTableRow key={transaction.id} transaction={transaction} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
