import { describe, expect, it } from 'vitest';

import { convert, convertSelection, formatConvertedValue, getUnitLabels, parseAmount } from './converter';

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

  it('converts data units, distinguishing decimal (SI) from binary (IEC) scales', () => {
    expect(convert(1, 'megabyte', 'byte')).toBeCloseTo(1e6, 5);
    expect(convert(1, 'mebibyte', 'byte')).toBeCloseTo(1024 ** 2, 5);
    // 1 MB is *not* 1 MiB — the entire reason this category has both.
    expect(convert(1, 'megabyte', 'mebibyte')).toBeCloseTo(0.9536743, 5);
    expect(convert(1, 'gibibyte', 'gigabyte')).toBeCloseTo(1.073741824, 8);
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

describe('convertSelection', () => {
  it('dispatches to the right category, including the new data category', () => {
    const selection = { category: 'data', from: 'byte', to: 'kilobyte' } as const;
    expect(convertSelection(selection, 1500)).toBeCloseTo(1.5, 10);
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

  it('returns a label for every data unit', () => {
    expect(getUnitLabels('data')).toEqual({
      byte: 'Bytes',
      kilobyte: 'Kilobytes',
      kibibyte: 'Kibibytes',
      megabyte: 'Megabytes',
      mebibyte: 'Mebibytes',
      gigabyte: 'Gigabytes',
      gibibyte: 'Gibibytes',
    });
  });
});

describe('formatConvertedValue', () => {
  it('scales precision down as magnitude grows', () => {
    expect(formatConvertedValue(0.0001234)).toBe('0.0001234');
    expect(formatConvertedValue(0.5)).toBe('0.5');
    expect(formatConvertedValue(12.3456)).toBe('12.346');
    expect(formatConvertedValue(1234.5678)).toBe('1,234.57');
  });

  it('groups thousands', () => {
    expect(formatConvertedValue(1048576)).toBe('1,048,576');
  });

  it('renders non-finite values as an em dash', () => {
    expect(formatConvertedValue(NaN)).toBe('—');
    expect(formatConvertedValue(Infinity)).toBe('—');
  });
});

describe('parseAmount', () => {
  it('parses a plain number', () => {
    expect(parseAmount('1000')).toBe(1000);
  });

  it('trims surrounding whitespace', () => {
    expect(parseAmount('  42  ')).toBe(42);
  });

  it('accepts a comma as the decimal separator', () => {
    expect(parseAmount('3,5')).toBe(3.5);
  });

  it('strips internal whitespace (thousands typed with spaces)', () => {
    expect(parseAmount('1 000')).toBe(1000);
  });

  it('returns NaN for non-numeric input', () => {
    expect(parseAmount('abc')).toBeNaN();
  });
});
