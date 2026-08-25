import { describe, expect, it } from 'vitest';

import { convert, convertSelection, convertSelectionReverse, getUnitLabels } from './converter';

describe('convert', () => {
  it('converts length units via the shared meter base unit', () => {
    expect(convert(1000, 'meter', 'kilometer')).toBeCloseTo(1, 10);
    expect(convert(1, 'mile', 'meter')).toBeCloseTo(1609.344, 3);
    expect(convert(1, 'foot', 'inch')).toBeCloseTo(12, 5);
  });

  it('converts weight units via the shared gram base unit', () => {
    expect(convert(1, 'kilogram', 'pound')).toBeCloseTo(2.2046, 3);
    expect(convert(16, 'ounce', 'pound')).toBeCloseTo(1, 3);
  });

  it('converts temperature correctly, including the offset (not just a scale)', () => {
    expect(convert(0, 'celsius', 'fahrenheit')).toBeCloseTo(32, 5);
    expect(convert(100, 'celsius', 'fahrenheit')).toBeCloseTo(212, 5);
    expect(convert(0, 'celsius', 'kelvin')).toBeCloseTo(273.15, 5);
    expect(convert(-40, 'celsius', 'fahrenheit')).toBeCloseTo(-40, 5);
  });

  it('round-trips back to the original value', () => {
    const original = 37;
    const converted = convert(original, 'celsius', 'fahrenheit');
    expect(convert(converted, 'fahrenheit', 'celsius')).toBeCloseTo(original, 10);
  });

  it('is a no-op when converting a unit to itself', () => {
    expect(convert(42, 'kilogram', 'kilogram')).toBe(42);
  });
});

describe('convertSelectionReverse', () => {
  it('is the inverse of convertSelection for the same selection', () => {
    const selection = { category: 'length', from: 'meter', to: 'kilometer' } as const;

    const forward = convertSelection(selection, 1000);
    expect(forward).toBeCloseTo(1, 10);
    expect(convertSelectionReverse(selection, forward)).toBeCloseTo(1000, 10);
  });

  it('accounts for temperature\'s offset, not just its scale', () => {
    const selection = { category: 'temperature', from: 'celsius', to: 'fahrenheit' } as const;

    expect(convertSelectionReverse(selection, 32)).toBeCloseTo(0, 10);
  });
});

describe('getUnitLabels', () => {
  it('returns a label for every unit in the category', () => {
    expect(getUnitLabels('temperature')).toEqual({
      celsius: 'Celsius',
      fahrenheit: 'Fahrenheit',
      kelvin: 'Kelvin',
    });
  });
});
