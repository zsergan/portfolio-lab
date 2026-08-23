import { describe, expect, it } from 'vitest';

import { getContrastRatio } from './contrastRatio';

describe('getContrastRatio', () => {
  it('returns 21:1 for black on white, the maximum possible ratio', () => {
    expect(getContrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1);
  });

  it('returns 1:1 for identical colors', () => {
    expect(getContrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1, 5);
  });

  it('is symmetric — order of foreground/background does not matter', () => {
    const a = getContrastRatio('#000000', '#ffffff');
    const b = getContrastRatio('#ffffff', '#000000');
    expect(a).toBeCloseTo(b, 10);
  });

  it("matches the site's own --accent contrast, hand-verified earlier against --bg", () => {
    expect(getContrastRatio('#9c1aff', '#f9f8f6')).toBeCloseTo(4.94, 1);
  });
});
