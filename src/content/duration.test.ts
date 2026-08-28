import { describe, expect, it } from 'vitest';

import { formatDuration } from './duration';

describe('formatDuration', () => {
  it('shows only months under a year', () => {
    expect(formatDuration(1)).toBe('1 mo');
    expect(formatDuration(10)).toBe('10 mo');
  });

  it('shows only years on an exact multiple of 12', () => {
    expect(formatDuration(12)).toBe('1 yr');
    expect(formatDuration(24)).toBe('2 yr');
  });

  it('combines years and months otherwise', () => {
    expect(formatDuration(31)).toBe('2 yr 7 mo');
    expect(formatDuration(13)).toBe('1 yr 1 mo');
  });
});
