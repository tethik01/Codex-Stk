export async function fetchLatestPrice(ticker: string): Promise<number> {
  const key = import.meta.env.VITE_ALPHA_VANTAGE_KEY;
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(ticker)}&apikey=${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Price fetch failed');
  const json = await res.json();
  const price = json['Global Quote']?.['05. price'];
  if (!price) throw new Error('Price not available');
  return parseFloat(price);
}
