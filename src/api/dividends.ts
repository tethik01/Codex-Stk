export async function fetchDividendsSince(ticker: string, purchaseDate: string): Promise<number[]> {
  const key = import.meta.env.VITE_ALPHA_VANTAGE_KEY;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${encodeURIComponent(ticker)}&apikey=${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Dividend fetch failed');
  const json = await res.json();
  const series = json['Monthly Adjusted Time Series'];
  if (!series) throw new Error('Dividend data not available');
  const start = new Date(purchaseDate);
  const dividends: number[] = [];
  for (const [dateStr, data] of Object.entries<any>(series)) {
    const date = new Date(dateStr);
    if (date >= start) {
      const amt = parseFloat((data as any)['7. dividend amount']);
      if (amt > 0) dividends.push(amt);
    }
  }
  return dividends;
}
