import {type ExchangeRate } from "../types/CurrencyContext";
import { TokenDisplay } from "./IconAssets";

interface RateTableRowProps {
    rate: ExchangeRate;
    index: number;
}

function RateTableRow({ rate, index }: RateTableRowProps) {
  return (
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
  )
}

export default RateTableRow