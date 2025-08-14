import { useState, useEffect } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { useSwapHistory } from '../contexts/SwapHistoryContext';
import { TokenDisplay } from './IconAssets';
import ArrowCollapse from '/arrowCollapse.svg';

function CurrencySwapForm() {
    const { currencies, getExchangeRate, isLoading, error } = useCurrency();
    const { addTransaction } = useSwapHistory();
    const [fromCurrency, setFromCurrency] = useState<string>('');
    const [toCurrency, setToCurrency] = useState<string>('');
    const [fromAmount, setFromAmount] = useState('');
    const [toAmount, setToAmount] = useState('');
    const [showFromDropdown, setShowFromDropdown] = useState(false);
    const [showToDropdown, setShowToDropdown] = useState(false);
    const [isSwapLoading, setIsSwapLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Set default currencies when data loads
    useEffect(() => {
        if (currencies.length > 0) {
            if (!fromCurrency) {
                setFromCurrency(currencies[0].symbol);
            }
            if (!toCurrency) {
                setToCurrency(currencies[1]?.symbol || currencies[0].symbol);
            }
        }
    }, [currencies, fromCurrency, toCurrency]);

    // Calculate conversion when currencies or amount changes
    useEffect(() => {
        if (fromCurrency && toCurrency && fromAmount && fromCurrency !== toCurrency) {
            const rate = getExchangeRate(fromCurrency, toCurrency);
            if (rate !== null) {
                const numValue = parseFloat(fromAmount) || 0;
                setToAmount((numValue * rate).toFixed(6));
            }
        }
    }, [fromCurrency, toCurrency, fromAmount, getExchangeRate]);

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
        setFromAmount(toAmount);
        setToAmount(fromAmount);
    };

    const handleFromAmountChange = (value: string) => {
        setFromAmount(value);
    };

    const getCurrentRate = () => {
        if (!fromCurrency || !toCurrency || fromCurrency === toCurrency) return null;
        return getExchangeRate(fromCurrency, toCurrency);
    };

    const handleSwap = async () => {
        if (!fromAmount || !toAmount || fromCurrency === toCurrency) return;
        
        setIsSwapLoading(true);
        
        // Mock backend interaction with 1 second loading
        setTimeout(() => {
            setIsSwapLoading(false);
            setShowSuccess(true);
            
            // Add transaction to history
            const currentRate = getCurrentRate();
            if (currentRate) {
                addTransaction({
                    fromCurrency,
                    toCurrency,
                    fromAmount: parseFloat(fromAmount),
                    toAmount: parseFloat(toAmount),
                    exchangeRate: currentRate,
                    commission: 2.48,
                    status: 'completed'
                });
            }
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }, 1000);
    };

    const currentRate = getCurrentRate();
    const commission = 2.48;
    const fromCurrencyData = currencies.find(c => c.symbol === fromCurrency);
    const toCurrencyData = currencies.find(c => c.symbol === toCurrency);
    
    const totalExpected = fromCurrencyData && fromAmount 
        ? parseFloat(fromAmount) * fromCurrencyData.price - commission 
        : 0;
    const leastAmount = totalExpected * 0.99; // 1% slippage

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-white text-xl">Loading currency data...</div>
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
        <div className="min-h-screen flex p-6 justify-center">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">Swap</h1>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-2xl border border-gray-700">
                    {/* From Currency */}
                    <div className="bg-gray-700 rounded-xl p-4 mb-4 relative">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <TokenDisplay token={fromCurrency} showPrice={true} />
                                <button
                                    onClick={() => setShowFromDropdown(!showFromDropdown)}
                                    className="text-gray-400 hover:text-white hover:scale-110 transition-colors"
                                >
                                    <img src={ArrowCollapse} alt="arrowCollapse" className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="text-right">
                                <div className="text-gray-400 text-sm">Balance</div>
                                <div className="text-gray-300 text-sm">
                                    {fromCurrencyData ? `$${fromCurrencyData.price.toFixed(6)}` : 'N/A'}
                                </div>
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
                            <div className="absolute mt-2 bg-gray-700 rounded-lg border border-gray-600 shadow-lg z-10 w-48 max-h-60 overflow-y-auto">
                                {currencies.map((currency) => (
                                    <div
                                        key={currency.symbol}
                                        onClick={() => {
                                            setFromCurrency(currency.symbol);
                                            setShowFromDropdown(false);
                                        }}
                                        className="flex items-center space-x-3 p-3 hover:bg-gray-600 cursor-pointer rounded-lg"
                                    >
                                        <TokenDisplay token={currency.symbol} showPrice={true} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Swap Direction Button */}
                    <div className="flex justify-center mb-4">
                        <button
                            onClick={swapCurrencies}
                            className="bg-gray-700 hover:bg-gray-600 p-3 rounded-full border border-gray-600 transition-all duration-50"
                        >
                            <div className="text-white text-lg">⇅</div>
                        </button>
                    </div>

                    {/* To Currency */}
                    <div className="bg-gray-700 rounded-xl p-4 mb-6 relative">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <TokenDisplay token={toCurrency} showPrice={true} />
                                <button
                                    onClick={() => setShowToDropdown(!showToDropdown)}
                                    className="text-gray-400 hover:text-white hover:scale-110 transition-colors"
                                >
                                    <img src={ArrowCollapse} alt="arrowCollapse" className="w-4 h-4" />

                                </button>
                            </div>
                            <div className="text-right">
                                <div className="text-gray-400 text-sm">Balance</div>
                                <div className="text-gray-300 text-sm">
                                    {toCurrencyData ? `$${toCurrencyData.price.toFixed(6)}` : 'N/A'}
                                </div>
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white">
                            {toAmount || '0.00'}
                        </div>

                        {/* To Currency Dropdown */}
                        {showToDropdown && (
                            <div className="absolute mt-2 bg-gray-700 rounded-lg border border-gray-600 shadow-lg z-10 w-48 max-h-60 overflow-y-auto">
                                {currencies.map((currency) => (
                                    <div
                                        key={currency.symbol}
                                        onClick={() => {
                                            setToCurrency(currency.symbol);
                                            setShowToDropdown(false);
                                        }}
                                        className="flex items-center space-x-3 p-3 hover:bg-gray-600 cursor-pointer rounded-lg"
                                    >
                                        <TokenDisplay token={currency.symbol} showPrice={true} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Transaction Details */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Conversion Rate</span>
                            <span className="text-gray-400">
                                {currentRate 
                                    ? `1 ${fromCurrency} = ${currentRate.toFixed(6)} ${toCurrency}`
                                    : 'N/A'
                                }
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Commission</span>
                            <span className="text-gray-400">${commission}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Total Expected After Fees</span>
                            <span className="text-gray-400">${totalExpected.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">The Least You'll Get at 1.00% Slippage</span>
                            <span className="text-gray-400">${leastAmount.toFixed(2)}</span>
                        </div>
                    </div>


                    {/* Swap Button */}
                    <button 
                        onClick={handleSwap}
                        disabled={isSwapLoading || !fromAmount || !toAmount || fromCurrency === toCurrency}
                        className={`w-full font-bold py-4 px-6 rounded-xl text-lg transition-colors ${
                            isSwapLoading || !fromAmount || !toAmount || fromCurrency === toCurrency
                                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                    >
                        {isSwapLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Processing Swap...</span>
                            </div>
                        ) : (
                            'Swap'
                        )}
                    </button>
                </div>
                
                    {/* Success Notification */}
                    {showSuccess && (
                        <div className="my-4 bg-green-500 text-white p-4 rounded-xl flex items-center space-x-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium">Swap completed successfully!</span>
                        </div>
                    )}
            </div>
            
        </div>
    );
}

export default CurrencySwapForm; 
