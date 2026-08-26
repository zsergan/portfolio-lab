import { describe, expect, it } from 'vitest';

import { getContrastRatio } from '../contrastRatio/contrastRatio';
import { findNearestPassingShades } from './nearestPassingShades';

function expectFiveValidHexShades(shades: string[]) {
  expect(shades).toHaveLength(5);
  for (const shade of shades) {
    expect(shade).toMatch(/^#[0-9a-f]{6}$/);
  }
}

// Independent (implementation-unaware) HSL hue, used only to sanity-check
// that a returned shade is still recognizably the same color family as the
// input — not to assert against the module's own OKLCH math.
function hueOf(hex: string): number | null {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  if (delta < 1e-3) return null;

  let hue: number;
  if (max === r) hue = ((g - b) / delta) % 6;
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;

  hue *= 60;
  return hue < 0 ? hue + 360 : hue;
}

function angularDistance(a: number, b: number): number {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

describe('findNearestPassingShades', () => {
  it('returns 5 hex shades that all pass AAA-normal against a light background', () => {
    const { shades, allPass } = findNearestPassingShades('#3d2f6b', '#f2eee4');

    expectFiveValidHexShades(shades);
    expect(allPass).toBe(true);
    for (const shade of shades) {
      expect(getContrastRatio(shade, '#f2eee4')).toBeGreaterThanOrEqual(7);
    }
  });

  it('returns 5 hex shades that all pass AAA-normal against a dark background', () => {
    const { shades, allPass } = findNearestPassingShades('#f2eee4', '#16171d');

    expectFiveValidHexShades(shades);
    expect(allPass).toBe(true);
    for (const shade of shades) {
      expect(getContrastRatio(shade, '#16171d')).toBeGreaterThanOrEqual(7);
    }
  });

  it('keeps the original foreground as the first shade when it already passes', () => {
    const { shades } = findNearestPassingShades('#000000', '#ffffff');

    expect(shades[0]).toBe('#000000');
  });

  it('honors a custom target ratio', () => {
    const { shades, allPass } = findNearestPassingShades('#777777', '#888888', 3);

    expect(allPass).toBe(true);
    for (const shade of shades) {
      expect(getContrastRatio(shade, '#888888')).toBeGreaterThanOrEqual(3);
    }
  });

  it('reports allPass=false and still returns a meaningful (non-identical) gradient when no shade reaches the target', () => {
    // Neither black nor white reaches 7:1 against this mid-luminance background.
    const { shades, allPass } = findNearestPassingShades('#3d2f6b', '#787878');

    expect(allPass).toBe(false);
    expectFiveValidHexShades(shades);
    expect(new Set(shades).size).toBeGreaterThan(1);
  });

  it('keeps a saturated hue recognizable instead of shifting toward a different color family', () => {
    const { shades } = findNearestPassingShades('#0000ff', '#000000');
    const originalHue = hueOf('#0000ff')!;

    for (const shade of shades) {
      const hue = hueOf(shade);
      if (hue === null) continue; // shades near the extreme can be effectively desaturated

      expect(angularDistance(hue, originalHue)).toBeLessThan(30);
    }
  });
});
