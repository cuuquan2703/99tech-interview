# Currency Exchange Application

A React-based cryptocurrency exchange application with real-time price data and exchange rate calculations.

## Features

- **Real-time Currency Data**: Fetches live cryptocurrency prices from the Switcheo API
- **Global State Management**: Uses React Context for centralized currency state management
- **Exchange Rate Calculator**: Computes conversion rates between all available currency pairs
- **Token Icons**: Displays proper cryptocurrency icons with fallback support
- **Responsive Design**: Modern UI with Tailwind CSS styling

## Architecture

### Currency Context (`src/contexts/CurrencyContext.tsx`)

The application uses React Context to manage global currency state:

- **Data Fetching**: Uses `useLayoutEffect` to fetch currency data before DOM mount
- **API Integration**: Connects to `https://interview.switcheo.com/prices.json` for live price data
- **Exchange Rate Calculation**: Automatically computes rates between all currency pairs
- **State Management**: Provides loading states, error handling, and data refresh capabilities

### Key Components

#### IconAssets (`src/components/IconAssets.tsx`)
- `TokenIcon`: Displays cryptocurrency icons with fallback to initials
- `TokenDisplay`: Shows token icon, name, and optional price
- `TokenSelector`: Interactive token selection component

#### CurrencySwapForm (`src/components/CurrencySwapForm.tsx`)
- Real-time currency conversion calculator
- Dynamic exchange rate updates
- Token selection dropdowns with live data
- Commission and slippage calculations

#### Rates (`src/components/Rates.tsx`)
- Comprehensive exchange rate table
- Search and filtering capabilities
- Sort by rate or volume
- Currency overview grid

#### Header (`src/components/Header.tsx`)
- Navigation between application sections
- Real-time status indicator
- Manual refresh functionality

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

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the application

## Technical Details

- **Framework**: React 18 with TypeScript
- **State Management**: React Context + Hooks
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Data Fetching**: Native fetch API with useLayoutEffect
- **Error Handling**: Comprehensive error states and user feedback

## Performance Features

- **Efficient Data Processing**: Deduplication of API responses
- **Optimized Re-renders**: Context optimization for minimal component updates
- **Lazy Loading**: Currency data loaded only when needed
- **Memory Management**: Proper cleanup of API calls and state

## Future Enhancements

- WebSocket integration for real-time price updates
- Historical price charts and analytics
- Portfolio management features
- Advanced trading functionality
- Mobile app optimization
