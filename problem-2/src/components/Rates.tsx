import React, { useState } from 'react';

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  change24h: number;
  volume24h: number;
}

const exchangeRates: ExchangeRate[] = [
  { from: 'BTC', to: 'ETH', rate: 15.42, change24h: 2.3, volume24h: 1250000 },
  { from: 'ETH', to: 'USDC', rate: 3245.67, change24h: -1.2, volume24h: 890000 },
  { from: 'SOL', to: 'USDT', rate: 98.45, change24h: 5.7, volume24h: 450000 },
  { from: 'ADA', to: 'BTC', rate: 0.000024, change24h: -0.8, volume24h: 320000 },
  { from: 'DOT', to: 'ETH', rate: 0.0089, change24h: 1.4, volume24h: 280000 },
  { from: 'LINK', to: 'USDC', rate: 12.34, change24h: 3.1, volume24h: 210000 },
  { from: 'UNI', to: 'ETH', rate: 0.0045, change24h: -2.1, volume24h: 180000 },
  { from: 'AVAX', to: 'USDT', rate: 23.67, change24h: 4.2, volume24h: 420000 },
  { from: 'MATIC', to: 'USDC', rate: 0.85, change24h: 1.8, volume24h: 350000 },
  { from: 'BUSD', to: 'MATIC', rate: 0.799059, change24h: 0.5, volume24h: 280000 },
  { from: 'USDC', to: 'ETH', rate: 0.000308, change24h: -0.9, volume24h: 950000 },
  { from: 'USDT', to: 'BTC', rate: 0.000041, change24h: 1.1, volume24h: 1100000 },
];

function Rates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'volume' | 'change'>('volume');

  const filteredRates = exchangeRates.filter(rate =>
    rate.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rate.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRates = [...filteredRates].sort((a, b) => {
    if (sortBy === 'volume') {
      return b.volume24h - a.volume24h;
    } else {
      return Math.abs(b.change24h) - Math.abs(a.change24h);
    }
  });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Exchange Rates</h1>
          <p className="text-gray-400 text-lg">
            Real-time cryptocurrency exchange rates and market data
          </p>
        </div>

        {/* Search and Sort Controls */}
        <div className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search currencies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl border border-gray-600 focus:border-green-500 focus:outline-none"
              />
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('volume')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  sortBy === 'volume'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Sort by Volume
              </button>
              <button
                onClick={() => setSortBy('change')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  sortBy === 'change'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Sort by Change
              </button>
            </div>
          </div>
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
                    Exchange Rate
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    24h Change
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    24h Volume
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {sortedRates.map((rate, index) => (
                  <tr key={index} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">🟠</span>
                          <span className="text-white font-medium">{rate.from}</span>
                          <span className="text-gray-400">→</span>
                          <span className="text-lg">🔵</span>
                          <span className="text-white font-medium">{rate.to}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-white font-mono">
                        {rate.rate < 0.001 ? rate.rate.toExponential(4) : rate.rate.toFixed(6)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        rate.change24h >= 0
                          ? 'bg-green-900 text-green-300'
                          : 'bg-red-900 text-red-300'
                      }`}>
                        {rate.change24h >= 0 ? '+' : ''}{rate.change24h}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-gray-300">
                        ${(rate.volume24h / 1000).toFixed(0)}K
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="text-gray-400 text-sm font-medium">Total Pairs</div>
            <div className="text-2xl font-bold text-white">{exchangeRates.length}</div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="text-gray-400 text-sm font-medium">Total Volume (24h)</div>
            <div className="text-2xl font-bold text-white">
              ${(exchangeRates.reduce((sum, rate) => sum + rate.volume24h, 0) / 1000000).toFixed(1)}M
            </div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="text-gray-400 text-sm font-medium">Active Markets</div>
            <div className="text-2xl font-bold text-white">
              {exchangeRates.filter(rate => rate.volume24h > 100000).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Rates;
