import { useCurrency } from '../contexts/CurrencyContext';

import atom from "/tokens/ATOM.svg";
import axlusdc from "/tokens/axlUSDC.svg";
import blur from "/tokens/BLUR.svg";
import bneo from "/tokens/bNEO.svg";
import busd from "/tokens/BUSD.svg";
import eth from "/tokens/ETH.svg";
import evmos from "/tokens/EVMOS.svg";
import gmx from "/tokens/GMX.svg";
import ibcx from "/tokens/IBCX.svg";
import iris from "/tokens/IRIS.svg";
import kuji from "/tokens/KUJI.svg";
import lsi from "/tokens/LSI.svg";
import luna from "/tokens/LUNA.svg";
import okb from "/tokens/OKB.svg";
import okt from "/tokens/OKT.svg";
import ratom from "/tokens/rATOM.svg";
import rswth from "/tokens/rSWTH.svg";
import statom from "/tokens/stATOM.svg";
import stevmos from "/tokens/stEVMOS.svg";
import stluna from "/tokens/stLUNA.svg";
import stosmo from "/tokens/stOSMO.svg";
import strd from "/tokens/STRD.svg";
import swth from "/tokens/SWTH.svg";
import usc from "/tokens/USC.svg";
import usd from "/tokens/USD.svg";
import usdc from "/tokens/USDC.svg";
import wbtc from "/tokens/WBTC.svg";
import wsteth from "/tokens/wstETH.svg";
import yieldusd from "/tokens/YieldUSD.svg";
import zil from "/tokens/ZIL.svg";

const icons: Record<string, string> = {
    ATOM: atom,
    axlUSDC: axlusdc,
    BLUR: blur,
    bNEO: bneo,
    BUSD: busd,
    ETH: eth,
    EVMOS: evmos,
    GMX: gmx,
    IBCX: ibcx,
    IRIS: iris,
    KUJI: kuji,
    LSI: lsi,
    LUNA: luna,
    OKB: okb,
    OKT: okt,
    rATOM: ratom,
    rSWTH: rswth,
    stATOM: statom,
    stEVMOS: stevmos,
    stLUNA: stluna,
    stOSMO: stosmo,
    STRD: strd,
    SWTH: swth,
    USC: usc,
    USD: usd,
    USDC: usdc,
    WBTC: wbtc,
    wstETH: wsteth,
    YieldUSD: yieldusd,
    ZIL: zil,
};

export const TokenIcon = ({ token }: { token: string }) => {
    const icon = icons[token];

    if (!icon) {
        return <div className="h-6 w-6 bg-gray-600 rounded-full flex items-center justify-center text-xs text-white">
            {token.slice(0, 2)}
        </div>;
    }

    return <img src={icon} alt={`${token} icon`} className="h-6 w-6" />;
};

export const TokenDisplay = ({ token, showPrice = false, className = "" }: { 
    token: string; 
    showPrice?: boolean;
    className?: string;
}) => {
    const { getCurrencyBySymbol } = useCurrency();
    const currency = getCurrencyBySymbol(token);

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <TokenIcon token={token} />
            <div className="flex flex-col">
                <span className="text-white font-medium">{token}</span>
                {showPrice && currency && (
                    <span className="text-gray-400 text-xs">
                        ${currency.price.toFixed(6)}
                    </span>
                )}
            </div>
        </div>
    );
};

export const TokenSelector = ({ 
    selectedToken, 
    showPrice = false,
    className = ""
}: { 
    selectedToken: string; 
    onTokenSelect: (token: string) => void;
    showPrice?: boolean;
    className?: string;
}) => {
    return (
        <div className={`relative ${className}`}>
            <div className="flex items-center space-x-2 cursor-pointer">
                <TokenDisplay token={selectedToken} showPrice={showPrice} />
                <span className="text-gray-400">▼</span>
            </div>
        </div>
    );
};