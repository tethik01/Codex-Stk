import { Position } from './types';
import { investedAmount, currentValue } from './utils/calc';

interface Props {
  positions: Position[];
}

export default function PortfolioSummary({ positions }: Props) {
  const totalInvested = positions.reduce((s, p) => s + investedAmount(p), 0);
  const totalCurrent = positions.reduce((s, p) => s + currentValue(p), 0);
  const gain = totalCurrent - totalInvested;
  const gainPct = totalInvested ? (gain / totalInvested) * 100 : 0;
  const totalDivs = positions.reduce((s, p) => s + (p.dividendsCad || 0), 0);

  return (
    <div className="p-4 border rounded mt-4">
      <div>Total Invested: {totalInvested.toFixed(2)} CAD</div>
      <div>Current Value: {totalCurrent.toFixed(2)} CAD</div>
      <div>Gain/Loss: {gain.toFixed(2)} CAD ({gainPct.toFixed(2)}%)</div>
      <div>Total Dividends: {totalDivs.toFixed(2)} CAD</div>
    </div>
  );
}
