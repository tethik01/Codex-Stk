import { Position } from '../types';

export const investedAmount = (p: Position) => p.shares * p.purchasePriceCad;

export const currentValue = (p: Position) =>
  p.latestPriceCad ? p.latestPriceCad * p.shares : 0;

export const gainLossValue = (p: Position) => currentValue(p) - investedAmount(p);

export const gainLossPercent = (p: Position) =>
  investedAmount(p) ? (gainLossValue(p) / investedAmount(p)) * 100 : 0;

export const totalDividends = (dividends: number[], shares: number) =>
  dividends.reduce((s, d) => s + d, 0) * shares;
