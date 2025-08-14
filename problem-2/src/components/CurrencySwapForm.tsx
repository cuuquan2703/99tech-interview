import React, { useState } from 'react';

interface Currency {
  symbol: string;
  name: string;
  icon: string;
  balance: number;
  usdValue: number;
}

const currencies: Currency[] = [
  { symbol: 'BUSD', name: 'Binance USD', icon: '🟡', balance: 10345.28, usdValue: 10345.28 },
  { symbol: 'ETH', name: 'Ethereum', icon: '🔵', balance: 5.42, usdValue: 10840.00 },
  { symbol: 'MATIC', name: 'Polygon', icon: '🟣', balance: 11892.74, usdValue: 984.16 },
  { symbol: 'BTC', name: 'Bitcoin', icon: '🟠', balance: 0.25, usdValue: 12500.00 },
  { symbol: 'USDC', name: 'USD Coin', icon: '🔵', balance: 5000.00, usdValue: 5000.00 },
];

function CurrencySwapForm() {
  const [fromCurrency, setFromCurrency] = useState<Currency>(currencies[0]);
  const [toCurrency, setToCurrency] = useState<Currency>(currencies[2]);
  const [fromAmount, setFromAmount] = useState('1945.58');
  const [toAmount, setToAmount] = useState('842.31');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    // Simple conversion logic (in real app, this would use actual rates)
    const numValue = parseFloat(value) || 0;
    const rate = 0.799059; // 1 BUSD = 0.799059 MATIC (example)
    setToAmount((numValue * rate).toFixed(2));
  };

  const commission = 2.48;
  const totalExpected = parseFloat(fromAmount) * fromCurrency.usdValue / 1000 - commission;
  const leastAmount = totalExpected * 0.99; // 1% slippage

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Swap</h1>
          <p className="text-gray-400 text-sm">
            Swap Any Assets Simply And Securely With Coin-Ex Self Developed Algorithm
          </p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700">
          {/* From Currency */}
          <div className="bg-gray-700 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{fromCurrency.icon}</span>
                <span className="text-white font-medium">{fromCurrency.symbol}</span>
                <button 
                  onClick={() => setShowFromDropdown(!showFromDropdown)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ▼
                </button>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-sm">Bal. {fromCurrency.balance.toLocaleString()} {fromCurrency.symbol}</div>
                <div className="text-gray-300 text-sm">${fromCurrency.usdValue.toLocaleString()}</div>
              </div>
            </div>
            <input
              type="text"
              value={fromAmount}
              onChange={(e) => handleFromAmountChange(e.target.value)}
              className="w-full bg-transparent text-3xl font-bold text-white outline-none"
              placeholder="0.00"
            />
            
            {/* From Currency Dropdown */}
            {showFromDropdown && (
              <div className="absolute mt-2 bg-gray-700 rounded-lg border border-gray-600 shadow-lg z-10 w-48">
                {currencies.map((currency) => (
                  <div
                    key={currency.symbol}
                    onClick={() => {
                      setFromCurrency(currency);
                      setShowFromDropdown(false);
                    }}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-600 cursor-pointer rounded-lg"
                  >
                    <span className="text-xl">{currency.icon}</span>
                    <span className="text-white">{currency.symbol}</span>
                    <span className="text-gray-400 text-sm">{currency.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Swap Direction Button */}
          <div className="flex justify-center mb-4">
            <button
              onClick={swapCurrencies}
              className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full border border-gray-600 transition-colors"
            >
              <div className="text-white text-lg">⇅</div>
            </button>
          </div>

          {/* To Currency */}
          <div className="bg-gray-700 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{toCurrency.icon}</span>
                <span className="text-white font-medium">{toCurrency.symbol}</span>
                <button 
                  onClick={() => setShowToDropdown(!showToDropdown)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ▼
                </button>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-sm">Bal. {toCurrency.balance.toLocaleString()} {toCurrency.symbol}</div>
                <div className="text-gray-300 text-sm">${toCurrency.usdValue.toLocaleString()}</div>
              </div>
            </div>
            <div className="text-3xl font-bold text-white">
              {toAmount}
            </div>
            
            {/* To Currency Dropdown */}
            {showToDropdown && (
              <div className="absolute mt-2 bg-gray-700 rounded-lg border border-gray-600 shadow-lg z-10 w-48">
                {currencies.map((currency) => (
                  <div
                    key={currency.symbol}
                    onClick={() => {
                      setToCurrency(currency);
                      setShowToDropdown(false);
                    }}
                    className="flex items-center space-x-3 p-3 hover:bg-gray-600 cursor-pointer rounded-lg"
                  >
                    <span className="text-xl">{currency.icon}</span>
                    <span className="text-white">{currency.symbol}</span>
                    <span className="text-gray-400 text-sm">{currency.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Transaction Details */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Conversion Rate</span>
              <span className="text-white">1 {fromCurrency.symbol} = 0.799059 {toCurrency.symbol}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Commission</span>
              <span className="text-white">${commission}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Total Expected After Fees</span>
              <span className="text-white">${totalExpected.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">The Least You'll Get at 1.00% Slippage</span>
              <span className="text-white">${leastAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Connect Wallet Button */}
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default CurrencySwapForm; 