interface WalletBalance {
    blockchain(blockchain: any): unknown;
    currency: string;
    amount: number,
}

interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string
}

interface Props extends BoxProps {}

const PRIORITY = {
    'Osmosis': 100,
    'Ethereum': 50,
    'Arbitrum': 30,
    'Zilliqa': 20,
    'Neo': 20
};


const getPriority = (blockchain: any): number =>
    PRIORITY[blockchain] ?? -99;
const WalletPage: React.FC<Prop> = (props: Props) => {
    const balances = useWalletBalances();
    const prices = usePrices();

    const propBalances = useMemo<FormattedWalletBalance[]> (() => {
        return balances
        .filter((balance: WalletBalance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
        .sort((lhs: WalletBalance, rhs: WalletBalance) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain))
        .map((balance: WalletBalance) => {
            const usdValue = prices[balance.currency] * balance.amount;
            return {
                ...balance,
                formatted: balance.amount.toFixed(),
                usdValue
            }
        })
    },[balances, prices])

    return (
        <div {...rest}>
            {propBalances.map((balance: FormattedWalletBalance, index: number) => (
                <WalletRow
                    className={classes.row}
                    key={`${index}-${balances.blockchain}-${balances.currency}`} // You can modify here any key format you want as long as it unique
                    amount={balance.amount}
                    usdValue={balance.usdValue}
                    formattedAmount={balance.formatted}
                />
            ))}
        </div>
    )
}

