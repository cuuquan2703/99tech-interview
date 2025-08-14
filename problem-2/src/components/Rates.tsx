import React, { useState } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { TokenDisplay } from './IconAssets';

function Rates() {
  const { exchangeRates, currencies, isLoading, error } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const itemsPerPage = 10;

  const filteredRates = exchangeRates.filter(rate => {
    if (!searchTerm.trim()) return true;
    
    const search = searchTerm.toLowerCase().trim();
    
    // Check if search contains arrow (→) indicating a trading pair search
    if (search.includes('→') || search.includes('->') || search.includes('>')) {
      // Replace different arrow formats with standard arrow
      const normalizedSearch = search.replace(/->|>/g, '→');
      const [fromSearch, toSearch] = normalizedSearch.split('→').map(s => s.trim());
      
      // Search by both currencies in the pair
      const fromMatch = rate.from.toLowerCase().includes(fromSearch);
      const toMatch = rate.to.toLowerCase().includes(toSearch);
      
      return fromMatch && toMatch;
    }
    
    // Search by individual currency (first or second)
    const fromMatch = rate.from.toLowerCase().includes(search);
    const toMatch = rate.to.toLowerCase().includes(search);
    
    return fromMatch || toMatch;
  });

  const sortedRates = [...filteredRates].sort((a, b) => {
    if (sortDirection === 'desc') {
      return b.rate - a.rate;
    } else {
      return a.rate - b.rate;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedRates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRates = sortedRates.slice(startIndex, endIndex);

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  const handlePageChange = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    
    setIsPageLoading(true);
    
    // Mock backend interaction with 1 second loading
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsPageLoading(false);
    }, 1000);
  };

  const goToFirstPage = () => handlePageChange(1);
  const goToLastPage = () => handlePageChange(totalPages);
  const goToPreviousPage = () => handlePageChange(currentPage - 1);
  const goToNextPage = () => handlePageChange(currentPage + 1);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-white text-xl">Loading exchange rates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Exchange Rates</h1>
          <p className="text-gray-400 text-lg">
            Real-time cryptocurrency exchange rates from live market data
          </p>
        </div>

        {/* Search Controls */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search by currency or trading pair (e.g., ETH, BTC, ETH→BTC)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-green-500 focus:outline-none"
              />
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-3 text-center">
            <p className="text-gray-400 text-sm">
              Search by: First currency (ETH) • Second currency (BTC) • Trading pair (ETH→BTC)
            </p>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-4 text-center">
          <p className="text-gray-400">
            Showing {startIndex + 1}-{Math.min(endIndex, sortedRates.length)} of {sortedRates.length} trading pairs
          </p>
        </div>

        {/* Rates Table */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Trading Pair
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    <button 
                      onClick={toggleSortDirection}
                      className="flex items-center space-x-2 hover:text-white transition-colors"
                    >
                      <span>Exchange Rate</span>
                      <div className="flex flex-col">
                        {sortDirection === 'desc' ? (
                          <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    From Price (USD)
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    To Price (USD)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {isPageLoading ? (
                  // Loading state for page switching
                  Array.from({ length: itemsPerPage }).map((_, index) => (
                    <tr key={`loading-${index}`} className="animate-pulse">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                          <div className="w-16 h-4 bg-gray-600 rounded"></div>
                          <span className="text-gray-400">→</span>
                          <div className="w-6 h-6 bg-gray-600 rounded-full"></div>
                          <div className="w-16 h-4 bg-gray-600 rounded"></div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-20 h-4 bg-gray-600 rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-24 h-4 bg-gray-600 rounded"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-24 h-4 bg-gray-600 rounded"></div>
                      </td>
                    </tr>
                  ))
                ) : (
                  currentRates.map((rate, index) => (
                    <tr key={index} className="hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex items-center space-x-2">
                            <TokenDisplay token={rate.from} />
                            <span className="text-gray-400">→</span>
                            <TokenDisplay token={rate.to} />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-white font-mono">
                          {rate.rate < 0.001 ? rate.rate.toExponential(3) : rate.rate.toFixed(3)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-300 font-mono">
                          ${rate.fromPrice < 0.001 ? rate.fromPrice.toExponential(3) : rate.fromPrice.toFixed(3)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-300 font-mono">
                          ${rate.toPrice < 0.001 ? rate.toPrice.toExponential(3) : rate.toPrice.toFixed(3)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center">
            <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
              <div className="flex items-center space-x-2">
                {/* First Page */}
                <button
                  onClick={goToFirstPage}
                  disabled={currentPage === 1 || isPageLoading}
                  className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Previous Page */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1 || isPageLoading}
                  className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={isPageLoading}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                          currentPage === pageNum
                            ? 'bg-green-500 text-white'
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next Page */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages || isPageLoading}
                  className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>

                {/* Last Page */}
                <button
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages || isPageLoading}
                  className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="text-gray-400 text-sm font-medium">Total Pairs</div>
            <div className="text-2xl font-bold text-white">{exchangeRates.length}</div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="text-gray-400 text-sm font-medium">Available Currencies</div>
            <div className="text-2xl font-bold text-white">{currencies.length}</div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="text-gray-400 text-sm font-medium">Last Updated</div>
            <div className="text-2xl font-bold text-white">
              {currencies.length > 0 ? new Date(currencies[0].lastUpdated).toLocaleTimeString() : 'N/A'}
            </div>
          </div>
        </div>

        {/* Currency List */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">Available Currencies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {currencies.map((currency) => (
              <div key={currency.symbol} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <TokenDisplay token={currency.symbol} showPrice={true} />
                <div className="mt-2 text-xs text-gray-400">
                  Last updated: {new Date(currency.lastUpdated).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rates;

