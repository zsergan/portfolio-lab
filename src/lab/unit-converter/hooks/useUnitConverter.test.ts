import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useUnitConverter } from './useUnitConverter';

describe('useUnitConverter', () => {
  it('defaults to length, converting 1000 meters to 1 kilometer', () => {
    const { result } = renderHook(() => useUnitConverter());

    expect(result.current.category).toBe('length');
    expect(result.current.from).toBe('meter');
    expect(result.current.to).toBe('kilometer');
    expect(result.current.result).toEqual({ value: 1, label: 'Kilometers' });
  });

  it('resets to that category\'s defaults when the category changes', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.setCategory('temperature'));

    expect(result.current.category).toBe('temperature');
    expect(result.current.from).toBe('celsius');
    expect(result.current.to).toBe('fahrenheit');
    expect(result.current.value).toBe('0');
    expect(result.current.result).toEqual({ value: 32, label: 'Fahrenheit' });
  });

  it('swaps from/to without changing the category', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.swap());

    expect(result.current.category).toBe('length');
    expect(result.current.from).toBe('kilometer');
    expect(result.current.to).toBe('meter');
  });

  it('reports an invalid, null result when the value is cleared', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.setValue(''));

    expect(result.current.result).toBeNull();
  });

  it('recomputes the result when from/to change', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.setTo('mile'));

    expect(result.current.to).toBe('mile');
    expect(result.current.result?.value).toBeCloseTo(0.6214, 3);
    expect(result.current.result?.label).toBe('Miles');
  });
});
