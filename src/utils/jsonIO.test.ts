import { describe, it, expect } from 'vitest';
import { importPortfolio } from './jsonIO';

const valid = {
  version: '1.0',
  currency: 'CAD',
  positions: [],
};

describe('jsonIO', () => {
  it('imports valid portfolio', async () => {
    const file = new File([JSON.stringify(valid)], 'p.json', { type: 'application/json' });
    const data = await importPortfolio(file);
    expect(data.version).toBe('1.0');
  });

  it('rejects invalid portfolio', async () => {
    const file = new File([JSON.stringify({})], 'bad.json', { type: 'application/json' });
    await expect(importPortfolio(file)).rejects.toThrow();
  });
});
