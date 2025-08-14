import './App.css'
import { useState } from 'react'
import CurrencySwapForm from './components/CurrencySwapForm'
import Header from './components/Header'
import Rates from './components/Rates'
import History from './components/History'

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
        <>
            <Header currentPage={currentPage} onPageChange={setCurrentPage} />
            {renderPage()}
        </>
    )
}

export default App
