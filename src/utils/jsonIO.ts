import { PortfolioFile } from '../types';

export function exportPortfolio(data: PortfolioFile) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'portfolio_cad.json';
  a.click();
  URL.revokeObjectURL(url);
}

export async function importPortfolio(file: File): Promise<PortfolioFile> {
  const text = await file.text();
  const json = JSON.parse(text);
  if (json.version !== '1.0' || json.currency !== 'CAD' || !Array.isArray(json.positions)) {
    throw new Error('Invalid portfolio file');
  }
  return json as PortfolioFile;
}
