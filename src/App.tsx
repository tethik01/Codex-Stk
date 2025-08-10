import { useState } from 'react';
import PositionForm from './PositionForm';
import PositionsTable from './PositionsTable';
import PortfolioSummary from './PortfolioSummary';
import { Position, PortfolioFile } from './types';
import { fetchLatestPrice } from './api/prices';
import { fetchDividendsSince } from './api/dividends';
import { totalDividends } from './utils/calc';
import { exportPortfolio, importPortfolio } from './utils/jsonIO';

export default function App() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const add = (p: Position) => setPositions([...positions, p]);

  const del = (idx: number) => {
    setPositions(positions.filter((_, i) => i !== idx));
  };

  const refreshAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const updated = await Promise.all(
        positions.map(async (p) => {
          try {
            const price = await fetchLatestPrice(p.ticker);
            const divs = await fetchDividendsSince(p.ticker, p.purchaseDate);
            return {
              ...p,
              latestPriceCad: price,
              dividendsCad: totalDividends(divs, p.shares),
            };
          } catch (e) {
            setError('API error or rate limit');
            return p;
          }
        })
      );
      setPositions(updated);
    } finally {
      setLoading(false);
    }
  };

  const exportJson = () => {
    const file: PortfolioFile = { version: '1.0', currency: 'CAD', positions };
    exportPortfolio(file);
  };

  const importJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    try {
      const data = await importPortfolio(e.target.files[0]);
      setPositions(data.positions);
    } catch (err) {
      setError('Invalid JSON file');
    }
    e.target.value = '';
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl mb-4">Codex Stock Tracker</h1>
      <PositionForm onAdd={add} />
      <div className="flex gap-2 mt-4">
        <button onClick={refreshAll} className="bg-green-500 text-white px-2 py-1 rounded" disabled={loading}>
          {loading ? 'Loading...' : 'Refresh All'}
        </button>
        <button onClick={exportJson} className="bg-blue-500 text-white px-2 py-1 rounded">Export JSON</button>
        <label className="bg-gray-500 text-white px-2 py-1 rounded cursor-pointer">
          Import JSON
          <input type="file" accept="application/json" className="hidden" onChange={importJson} />
        </label>
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <PortfolioSummary positions={positions} />
      <PositionsTable positions={positions} onDelete={del} />
    </div>
  );
}
