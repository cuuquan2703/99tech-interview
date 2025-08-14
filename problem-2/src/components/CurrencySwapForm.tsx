import React, { useState } from 'react';

interface Currency {
  symbol: string;
  name: string;
  icon: string;
  balance: number;
  usdValue: number;
}

interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
  change24h: number;
}

const CurrencySwapForm: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<Currency>({
    symbol: 'BUSD',
    name: 'Binance USD',
    icon: '💛',
    balance: 10345.28,
    usdValue: 1946.30
  });

  const [toCurrency, setToCurrency] = useState<Currency>({
    symbol: 'MATIC',
    name: 'Polygon',
    icon: '🟣',
    balance: 11892.74,
    usdValue: 984.16
  });

  const [fromAmount, setFromAmount] = useState(1945.58);
  const [toAmount, setToAmount] = useState(842.31);
  const [showExchangeRates, setShowExchangeRates] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  // Mock exchange rates data
  const exchangeRates: ExchangeRate[] = [
    { from: 'BTC', to: 'ETH', rate: 15.42, change24h: 2.3 },
    { from: 'ETH', to: 'USDC', rate: 3245.67, change24h: -1.2 },
    { from: 'SOL', to: 'USDT', rate: 98.45, change24h: 5.7 },
    { from: 'ADA', to: 'BTC', rate: 0.000024, change24h: -0.8 },
    { from: 'DOT', to: 'ETH', rate: 0.0089, change24h: 1.4 },
    { from: 'LINK', to: 'USDC', rate: 12.34, change24h: 3.1 },
    { from: 'UNI', to: 'ETH', rate: 0.0045, change24h: -2.1 },
    { from: 'AVAX', to: 'USDT', rate: 23.67, change24h: 4.2 }
  ];

  const handleSwap = () => {
    // Swap logic would go here
    console.log('Swapping currencies...');
  };

  const handleConnectWallet = () => {
    setIsConnected(true);
  };

  const toggleExchangeRates = () => {
    setShowExchangeRates(!showExchangeRates);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Swap</h1>
          <p className="text-gray-300 text-lg">
            Swap Any Assets Simply And Securely With Coin-Ex Self Developed Algorithm
          </p>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* Swap Form Pane */}
          <div className="flex-1">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
              {/* From Currency Input */}
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl font-bold">
                      {fromCurrency.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-semibold text-lg">{fromCurrency.symbol}</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <span className="text-gray-400 text-sm">{fromCurrency.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm">Bal. {fromCurrency.balance.toLocaleString()} {fromCurrency.symbol}</div>
                    <div className="text-gray-400 text-sm">${fromCurrency.usdValue.toLocaleString()}</div>
                  </div>
                </div>
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(parseFloat(e.target.value) || 0)}
                  className="w-full mt-4 bg-transparent text-3xl font-bold text-white placeholder-gray-400 outline-none"
                  placeholder="0.00"
                />
              </div>

              {/* Swap Button */}
              <div className="flex justify-center mb-6">
                <button className="w-12 h-12 bg-gray-600/30 hover:bg-gray-600/50 border border-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </button>
              </div>

              {/* To Currency Input */}
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-2xl font-bold">
                      {toCurrency.icon}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-semibold text-lg">{toCurrency.symbol}</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <span className="text-gray-400 text-sm">{toCurrency.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-sm">Bal. {toCurrency.balance.toLocaleString()} {toCurrency.symbol}</div>
                    <div className="text-gray-400 text-sm">{toAmount.toFixed(2)}</div>
                  </div>
                </div>
                <input
                  type="number"
                  value={toAmount}
                  onChange={(e) => setToAmount(parseFloat(e.target.value) || 0)}
                  className="w-full mt-4 bg-transparent text-3xl font-bold text-white placeholder-gray-400 outline-none"
                  placeholder="0.00"
                />
              </div>

              {/* Transaction Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Conversion Rate</span>
                  <span className="text-white">1 {fromCurrency.symbol} = {(toAmount / fromAmount).toFixed(6)} {toCurrency.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Commission</span>
                  <span className="text-white">$2.48</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total Expected After Fees</span>
                  <span className="text-white">$714.98</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">The Least You'll Get at 1.00% Slippage</span>
                  <span className="text-white">$710.54</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={isConnected ? handleSwap : handleConnectWallet}
                className="w-full bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg"
              >
                {isConnected ? 'Swap Now' : 'Connect Wallet'}
              </button>
            </div>
          </div>

          {/* Exchange Rates Pane */}
          <div className={`transition-all duration-300 ease-in-out ${showExchangeRates ? 'w-80' : 'w-16'}`}>
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl h-fit">
              {/* Toggle Button */}
              <button
                onClick={toggleExchangeRates}
                className="w-full flex items-center justify-center mb-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors duration-200"
              >
                {showExchangeRates ? (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>

              {showExchangeRates && (
                <>
                  <h3 className="text-white font-semibold text-lg mb-4">Exchange Rates</h3>
                  <div className="space-y-3">
                    {exchangeRates.map((rate, index) => (
                      <div key={index} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-white font-medium">{rate.from}</span>
                            <span className="text-gray-400">→</span>
                            <span className="text-white font-medium">{rate.to}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-white text-sm font-medium">{rate.rate.toFixed(6)}</div>
                            <div className={`text-xs ${rate.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {rate.change24h >= 0 ? '+' : ''}{rate.change24h}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencySwapForm; 