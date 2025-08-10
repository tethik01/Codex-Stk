import { useState } from 'react';
import { Position } from './types';

interface Props {
  onAdd: (p: Position) => void;
}

export default function PositionForm({ onAdd }: Props) {
  const [ticker, setTicker] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [shares, setShares] = useState('');
  const [price, setPrice] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const p: Position = {
      ticker,
      purchaseDate,
      shares: Number(shares),
      purchasePriceCad: Number(price),
    };
    onAdd(p);
    setTicker('');
    setPurchaseDate('');
    setShares('');
    setPrice('');
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 p-4 border rounded">
      <label className="flex flex-col">
        Ticker
        <input value={ticker} onChange={e => setTicker(e.target.value)} required className="border p-1" />
      </label>
      <label className="flex flex-col">
        Purchase Date
        <input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} required className="border p-1" />
      </label>
      <label className="flex flex-col">
        Shares
        <input type="number" value={shares} onChange={e => setShares(e.target.value)} required className="border p-1" />
      </label>
      <label className="flex flex-col">
        Purchase Price (CAD)
        <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required className="border p-1" />
      </label>
      <button type="submit" className="bg-blue-500 text-white px-2 py-1 rounded">Add Position</button>
    </form>
  );
}
