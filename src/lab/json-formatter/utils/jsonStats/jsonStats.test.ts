import { describe, expect, it } from 'vitest';

import { computeJsonStats } from './jsonStats';

describe('computeJsonStats', () => {
  it('reports 0 keys and 0 depth for a bare scalar', () => {
    expect(computeJsonStats('hello')).toEqual({ keyCount: 0, depth: 0 });
    expect(computeJsonStats(42)).toEqual({ keyCount: 0, depth: 0 });
    expect(computeJsonStats(true)).toEqual({ keyCount: 0, depth: 0 });
    expect(computeJsonStats(null)).toEqual({ keyCount: 0, depth: 0 });
  });

  it('counts top-level keys and depth 1 for a flat object', () => {
    expect(computeJsonStats({ a: 1, b: 2 })).toEqual({ keyCount: 2, depth: 1 });
  });

  it("does not count array indices as keys, but arrays still add depth", () => {
    expect(computeJsonStats(['a', 'b', 'c'])).toEqual({ keyCount: 0, depth: 1 });
  });

  it('matches the design reference example: 14 keys, depth 4', () => {
    const value = {
      user: {
        id: 'u_8814',
        name: 'Zakhar Sergan',
        roles: ['admin', 'editor'],
        meta: {
          seen: '2026-08-24T09:12:00Z',
          locale: 'en-GB',
          plan: 'pro',
          seats: 4,
          flags: { beta: true, legacy: false },
        },
      },
      requestId: 'r_71f0c2',
      ok: true,
    };

    expect(computeJsonStats(value)).toEqual({ keyCount: 14, depth: 4 });
  });

  it('handles empty objects and arrays as a single level deep', () => {
    expect(computeJsonStats({})).toEqual({ keyCount: 0, depth: 1 });
    expect(computeJsonStats([])).toEqual({ keyCount: 0, depth: 1 });
  });

  it('accumulates depth correctly through a nested empty container', () => {
    expect(computeJsonStats({ a: {} })).toEqual({ keyCount: 1, depth: 2 });
    expect(computeJsonStats([[]])).toEqual({ keyCount: 0, depth: 2 });
  });

  it('does not overflow the call stack on JSON nested thousands of levels deep', () => {
    const depth = 10000;
    const value: unknown = JSON.parse('['.repeat(depth) + ']'.repeat(depth));

    expect(() => computeJsonStats(value)).not.toThrow();
    expect(computeJsonStats(value)).toEqual({ keyCount: 0, depth });
  });
});
