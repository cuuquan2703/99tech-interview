import { useState } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { TokenDisplay } from './IconAssets';
import Search from './Search';
import PaginationControl from './PaginationControl';
import RateTableRow from './RateTableRow';

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
      const normalizedSearch = search.replace(/->|>/g, '→');
      const [fromSearch, toSearch] = normalizedSearch.split('→').map(s => s.trim());
      
      const fromMatch = rate.from.toLowerCase().includes(fromSearch);
      const toMatch = rate.to.toLowerCase().includes(toSearch);
      
      return fromMatch && toMatch;
    }
    
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
        </div>

        {/* Search Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="relative flex-1 max-w-md">
              <Search 
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by currency"
              />
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
                    <RateTableRow rate={rate} index={index} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Controls */}
        <PaginationControl 
          totalPages={totalPages}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
          currentPage={currentPage}
          isPageLoading={isPageLoading}
          handlePageChange={handlePageChange}
        />

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

