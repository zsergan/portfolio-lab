import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useUnitConverter } from './useUnitConverter';

describe('useUnitConverter', () => {
  it('defaults to length, converting 1000 meters to 1 kilometer', () => {
    const { result } = renderHook(() => useUnitConverter());

    expect(result.current.category).toBe('length');
    expect(result.current.from).toBe('meter');
    expect(result.current.to).toBe('kilometer');
    expect(result.current.value).toBe('1000');
    expect(result.current.result).toBe('1');
  });

  it('resets to that category\'s defaults when the category changes', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.setCategory('temperature'));

    expect(result.current.category).toBe('temperature');
    expect(result.current.from).toBe('celsius');
    expect(result.current.to).toBe('fahrenheit');
    expect(result.current.value).toBe('0');
    expect(result.current.result).toBe('32');
  });

  it('defaults the new data category to megabytes -> mebibytes', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.setCategory('data'));

    expect(result.current.category).toBe('data');
    expect(result.current.from).toBe('megabyte');
    expect(result.current.to).toBe('mebibyte');
    expect(result.current.value).toBe('1');
    // formatConvertedValue rounds to 4 decimals below 1 — 0.95367... -> 0.9537.
    expect(Number(result.current.result.replace(/,/g, ''))).toBeCloseTo(0.9537, 4);
  });

  it('swaps from/to without touching the typed value', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.swap());

    expect(result.current.category).toBe('length');
    expect(result.current.from).toBe('kilometer');
    expect(result.current.to).toBe('meter');
    expect(result.current.value).toBe('1000');
    // 1000 is now read as kilometers -> meters, not the original meters -> kilometers.
    expect(Number(result.current.result.replace(/,/g, ''))).toBe(1000000);
  });

  it('reports an error and a dash result when the value is cleared', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.setValue(''));

    expect(result.current.result).toBe('—');
    expect(result.current.error).toBe('Enter a number to convert.');
  });

  it('reports an error and a dash result for non-numeric text', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.setValue('abc'));

    expect(result.current.result).toBe('—');
    expect(result.current.error).toBe('Enter a number to convert.');
  });

  it('accepts a comma as a decimal separator', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.setValue('1,5'));

    expect(result.current.error).toBeNull();
    // Default category is length (meter -> kilometer): 1.5 meters = 0.0015 km.
    expect(Number(result.current.result)).toBeCloseTo(0.0015, 6);
  });

  it('recomputes the result when from/to change', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.setTo('mile'));

    expect(result.current.to).toBe('mile');
    expect(Number(result.current.result)).toBeCloseTo(0.6214, 3);
  });

  it('reset restores the current category\'s defaults', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.setValue('42'));
    act(() => result.current.setTo('mile'));
    act(() => result.current.reset());

    expect(result.current.from).toBe('meter');
    expect(result.current.to).toBe('kilometer');
    expect(result.current.value).toBe('1000');
  });
});
