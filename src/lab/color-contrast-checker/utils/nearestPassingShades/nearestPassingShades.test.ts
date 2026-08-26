import { describe, expect, it } from 'vitest';

import { getContrastRatio } from '../contrastRatio/contrastRatio';
import { findNearestPassingShades } from './nearestPassingShades';

function expectFiveValidHexShades(shades: string[]) {
  expect(shades).toHaveLength(5);
  for (const shade of shades) {
    expect(shade).toMatch(/^#[0-9a-f]{6}$/);
  }
}

describe('findNearestPassingShades', () => {
  it('returns 5 hex shades that all pass AAA-normal against a light background', () => {
    const shades = findNearestPassingShades('#3d2f6b', '#f2eee4');

    expectFiveValidHexShades(shades);
    for (const shade of shades) {
      expect(getContrastRatio(shade, '#f2eee4')).toBeGreaterThanOrEqual(7);
    }
  });

  it('returns 5 hex shades that all pass AAA-normal against a dark background', () => {
    const shades = findNearestPassingShades('#f2eee4', '#16171d');

    expectFiveValidHexShades(shades);
    for (const shade of shades) {
      expect(getContrastRatio(shade, '#16171d')).toBeGreaterThanOrEqual(7);
    }
  });

  it('keeps the original foreground as the first shade when it already passes', () => {
    const shades = findNearestPassingShades('#000000', '#ffffff');

    expect(shades[0]).toBe('#000000');
  });

  it('honors a custom target ratio', () => {
    const shades = findNearestPassingShades('#777777', '#888888', 3);

    for (const shade of shades) {
      expect(getContrastRatio(shade, '#888888')).toBeGreaterThanOrEqual(3);
    }
  });
});
