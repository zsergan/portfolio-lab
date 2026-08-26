import { describe, expect, it } from 'vitest';

import { getContrastRatio, scalePosition } from './contrastRatio';

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
    expect(getContrastRatio('#7c3aed', '#f7f6f3')).toBeCloseTo(5.27, 1);
  });
});

describe('scalePosition', () => {
  it('places 1:1 at the start and 21:1 (the maximum ratio) at the end', () => {
    expect(scalePosition(1)).toBe(0);
    expect(scalePosition(21)).toBeCloseTo(1, 10);
  });

  it('is monotonically increasing', () => {
    expect(scalePosition(3)).toBeLessThan(scalePosition(4.5));
    expect(scalePosition(4.5)).toBeLessThan(scalePosition(7));
    expect(scalePosition(7)).toBeLessThan(scalePosition(21));
  });

  it('clamps to [0, 1] even outside the WCAG range', () => {
    expect(scalePosition(0.5)).toBe(0);
    expect(scalePosition(30)).toBe(1);
  });
});
