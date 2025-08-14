#### CurrencySwapForm (`src/components/CurrencySwapForm.tsx`)
- Currency conversion calculator
- Dynamic exchange rate updates
- Token selection dropdowns with live data
- Commission and slippage calculations

#### Rates (`src/components/Rates.tsx`)
- Comprehensive exchange rate table
- Search and filtering capabilities
- Sort by rate or volume
- Currency overview grid

#### History (`src/components/History.tsx`)
- Swap transaction display (ID, currency pair, status, date)
- Search and filtering by currency pair and status

## Data Flow

1. **Initialization**: `useLayoutEffect` triggers API call on component mount
2. **Data Processing**: Raw API data is processed to extract latest prices per currency
3. **Rate Calculation**: Exchange rates are computed for all currency pairs
4. **State Distribution**: Data is distributed to components via Context
5. **Real-time Updates**: Components automatically update when data changes

## API Integration

The application integrates with the Switcheo API endpoint:
- **URL**: `https://interview.switcheo.com/prices.json`
- **Data Format**: JSON array of currency price objects
- **Update Frequency**: Data is fetched on mount and can be manually refreshed
- **Error Handling**: Graceful fallbacks for network issues and API errors

## Currency Support

The application supports a wide range of cryptocurrencies including:
- Major tokens: BTC, ETH, USDC, USDT, BNB
- DeFi tokens: AAVE, UNI, COMP, SNX
- Layer 1 tokens: SOL, ADA, DOT, NEAR
- And many more with automatic icon support

## Technical Details

- **Framework**: React 18 with TypeScript
- **State Management**: React Context + Hooks
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Data Fetching**: Native fetch API with useLayoutEffect
