# Codex Stk

Client-only React app for tracking Canadian & U.S. stocks with CAD-only calculations. No persistence or analytics.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` with your Alpha Vantage key:
   ```
   VITE_ALPHA_VANTAGE_KEY=YOUR_KEY
   ```
3. Run dev server:
   ```bash
   npm run dev
   ```
4. Run tests:
   ```bash
   npm test
   ```

## Features
- Add/edit/delete positions
- Fetch latest prices & dividends on demand
- CAD calculations only
- Export/Import portfolio to/from JSON files
- No storage; data lives only in memory

## Notes
- API calls use Alpha Vantage and are subject to rate limits.
- The app sends no portfolio data to any server except when fetching public market data.
