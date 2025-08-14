### Bug I
In row 70, the index of each item in `sortedBalances` is used as the key prop for rendering

React compares the previous and next lists to figure out what changed. The `key` tells React which item is which between renders. If you use the index as the `key`, React assumes that the same index = the same item, even if the actual data has changed.

Since sortedBalances changes based on [balances] and [prices], and it's unclear if useWalletBalances() and usePrices() keep them static, we should assume they can change. This means using the index as a key can cause incorrect UI updates.

for example:
```javascript
sortedBalanaced = [
    {blockchain: 'Osmosis', currency: 'BUSD', amount: 100},
    {blockchain: 'Ethereum', currency: 'ETH', amount: 20},
    {blockchain: 'Arbitrum', currency: 'GMX', amount: 23},
]
```
If the element at index 1 (Ethereum) is removed, the Arbitrum item (previously at index 2) will reuse the state of index 1 incorrectly.

### Bug II
- Lines form 44 --> 48
```javascript
if (lhsPriority > -99) {
    if (balance.amount <= 0) {
    return true;
    }
}
```
- `lhsPriority` is not defined in this scope. Likely intended to use `balancePriority` instead
- I'm not sure it is a bug or not, wallets with positive amounts are excluded. You likely intended to exclude negative balance but something not so right here.

### Bug III
In line 50
```javascript
  }, [balances, prices]);
```
- You use `prices` as a dependency for useMemo but it is never actually used in sorting/filtering ==> causing unnecessary recomputation of sortedBalances when only prices change, especially for expensive computation like filter() (with O(n)) and sort()(with O(nlogn))


### Bug IV
```javascript
  // format balances
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  //
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })

    return (
    <div {...rest}>
      {rows}
    </div>
  )
```
- `formattedBalances` is never used
- `formattedAmount` in <WalletRow> is taken from `balance.formatted`, but `sortedBalances` does not have a formatted property