export interface Position {
  ticker: string;
  purchaseDate: string; // YYYY-MM-DD
  shares: number;
  purchasePriceCad: number;
  latestPriceCad?: number;
  dividendsCad?: number;
}

export interface PortfolioFile {
  version: '1.0';
  currency: 'CAD';
  positions: Position[];
}
