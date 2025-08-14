# Currency Swap Form

A modern, responsive cryptocurrency swap interface built with React, TypeScript, and Tailwind CSS.

## Features

- **Glassmorphism Design**: Modern, translucent UI with backdrop blur effects
- **Dual Pane Layout**: 
  - Left pane: Swap form with currency inputs
  - Right pane: Exchange rates display (toggleable)
- **Responsive Design**: Optimized for various screen sizes
- **Interactive Elements**: Hover effects, smooth transitions, and animations
- **Real-time Calculations**: Dynamic conversion rates and fee calculations

## UI Components

### Swap Form
- Two currency input fields (From/To)
- Currency selection with dropdown indicators
- Balance display for each currency
- USD value equivalents
- Transaction details (conversion rate, fees, slippage)
- Action button (Connect Wallet/Swap Now)

### Exchange Rates Pane
- Toggleable sidebar showing current exchange rates
- 24-hour price change indicators
- Smooth expand/collapse animation
- Multiple currency pair displays

## Design Features

- **Glassmorphism**: Semi-transparent backgrounds with backdrop blur
- **Modern Borders**: Subtle white borders with transparency
- **Gradient Backgrounds**: Dark theme with purple accents
- **Smooth Animations**: Hover effects and transitions
- **Responsive Layout**: Flexbox-based responsive design

## Technologies Used

- React 19
- TypeScript
- Tailwind CSS
- Vite (Build tool)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development URL

## Project Structure

```
src/
├── components/
│   └── CurrencySwapForm.tsx    # Main swap form component
├── App.tsx                      # Main application component
├── App.css                      # Application styles
└── index.css                    # Global styles with Tailwind
```

## Customization

The component is built with TypeScript interfaces, making it easy to:
- Modify currency data structures
- Add new currency pairs
- Customize exchange rate calculations
- Implement real API integrations
- Adjust styling and themes

## Browser Support

- Modern browsers with ES2022 support
- CSS backdrop-filter support for glassmorphism effects
- Responsive design for mobile and desktop
