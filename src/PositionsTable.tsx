import { Position } from './types';
import { investedAmount, currentValue, gainLossValue, gainLossPercent } from './utils/calc';

interface Props {
  positions: Position[];
  onDelete: (index: number) => void;
}

export default function PositionsTable({ positions, onDelete }: Props) {
  return (
    <table className="min-w-full border mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">Ticker</th>
          <th className="p-2 border">Shares</th>
          <th className="p-2 border">Invested</th>
          <th className="p-2 border">Current Price</th>
          <th className="p-2 border">Current Value</th>
          <th className="p-2 border">Gain/Loss $</th>
          <th className="p-2 border">Gain/Loss %</th>
          <th className="p-2 border">Dividends</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {positions.map((p, idx) => (
          <tr key={idx} className="text-center">
            <td className="border p-1">{p.ticker}</td>
            <td className="border p-1">{p.shares}</td>
            <td className="border p-1">{investedAmount(p).toFixed(2)}</td>
            <td className="border p-1">{p.latestPriceCad?.toFixed(2) ?? '-'}</td>
            <td className="border p-1">{currentValue(p).toFixed(2)}</td>
            <td className="border p-1">{gainLossValue(p).toFixed(2)}</td>
            <td className="border p-1">{gainLossPercent(p).toFixed(2)}</td>
            <td className="border p-1">{p.dividendsCad?.toFixed(2) ?? '-'}</td>
            <td className="border p-1">
              <button onClick={() => onDelete(idx)} className="text-red-500">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
