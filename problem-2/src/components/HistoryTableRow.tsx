import type { SwapTransaction } from "../types/TSwapHistory";
import { formatDate, getStatusColor, getStatusIcon } from "../utils";
import { TokenDisplay } from "./IconAssets";

interface HistoryTableRowProps {
    transaction: SwapTransaction;
}


function HistoryTableRow({ transaction }: HistoryTableRowProps) {
  return (
    <tr key={transaction.id} className="hover:bg-gray-700 transition-colors">
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center space-x-2">
            <TokenDisplay token={transaction.fromCurrency} />
            <span className="text-gray-400">→</span>
            <TokenDisplay token={transaction.toCurrency} />
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-white">
            {transaction.fromAmount.toFixed(6)} {transaction.fromCurrency}
            </div>
            <div className="text-gray-400 text-sm">
            → {transaction.toAmount.toFixed(6)} {transaction.toCurrency}
            </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-gray-300 font-mono">
            1 {transaction.fromCurrency} = {transaction.exchangeRate.toFixed(6)} {transaction.toCurrency}
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-gray-300">
            ${transaction.commission.toFixed(2)}
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
            {getStatusIcon(transaction.status)}
            <span className="ml-1 capitalize">{transaction.status}</span>
            </span>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <span className="text-gray-300 text-sm">
            {formatDate(transaction.timestamp)}
            </span>
        </td>
    </tr>
  )
}

export default HistoryTableRow