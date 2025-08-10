import { describe, expect, it } from 'vitest';
import { investedAmount, currentValue, gainLossValue, gainLossPercent, totalDividends } from './calc';
import { Position } from '../types';

describe('calc utils', () => {
  const position: Position = {
    ticker: 'TEST',
    purchaseDate: '2024-01-01',
    shares: 100,
    purchasePriceCad: 10,
    latestPriceCad: 12.5,
  };

  it('calculates current value and gain', () => {
    expect(investedAmount(position)).toBe(1000);
    expect(currentValue(position)).toBe(1250);
    expect(gainLossValue(position)).toBe(250);
    expect(gainLossPercent(position)).toBe(25);
  });

  it('calculates total dividends', () => {
    const divs = [0.30, 0.32, 0.32];
    expect(totalDividends(divs, position.shares)).toBeCloseTo(94, 5);
  });
});
