import './App.css'
import { useState } from 'react'
import CurrencySwapForm from './components/CurrencySwapForm'
import Header from './components/Header'
import Rates from './components/Rates'
import History from './components/History'
import { CurrencyProvider } from './contexts/CurrencyContext'
import { SwapHistoryProvider } from './contexts/SwapHistoryContext'

function App() {
    const [currentPage, setCurrentPage] = useState<'swap' | 'rates' | 'history'>('swap');

    const renderPage = () => {
        switch (currentPage) {
            case 'swap':
                return <CurrencySwapForm />;
            case 'rates':
                return <Rates />;
            case 'history':
                return <History />;
            default:
                return <CurrencySwapForm />;
        }
    };

    return (
        <CurrencyProvider>
            <SwapHistoryProvider>
                <Header currentPage={currentPage} onPageChange={setCurrentPage} />
                {renderPage()}
            </SwapHistoryProvider>
        </CurrencyProvider>
    )
}

export default App
