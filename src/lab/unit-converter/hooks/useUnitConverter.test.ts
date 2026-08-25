import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useUnitConverter } from './useUnitConverter';

describe('useUnitConverter', () => {
  it('defaults to length, converting 1000 meters to 1 kilometer', () => {
    const { result } = renderHook(() => useUnitConverter());

    expect(result.current.category).toBe('length');
    expect(result.current.from).toBe('meter');
    expect(result.current.to).toBe('kilometer');
    expect(result.current.amount).toBe('1000');
    expect(result.current.result).toBe('1');
  });

  it('resets to that category\'s defaults when the category changes', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.setCategory('temperature'));

    expect(result.current.category).toBe('temperature');
    expect(result.current.from).toBe('celsius');
    expect(result.current.to).toBe('fahrenheit');
    expect(result.current.amount).toBe('0');
    expect(result.current.result).toBe('32');
  });

  it('swaps from/to and the amount/result values together, without changing the category', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.swap());

    expect(result.current.category).toBe('length');
    expect(result.current.from).toBe('kilometer');
    expect(result.current.to).toBe('meter');
    expect(result.current.amount).toBe('1');
    expect(result.current.result).toBe('1000');
  });

  it('reports an empty, errored result when the amount is cleared', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.setAmount(''));

    expect(result.current.result).toBe('');
    expect(result.current.amountError).toBe('Enter a number to convert.');
  });

  it('reports an empty, errored amount when the result is cleared', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.setResult(''));

    expect(result.current.amount).toBe('');
    expect(result.current.resultError).toBe('Enter a number to convert.');
  });

  it('back-computes the amount when the result field is edited directly', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.setResult('2'));

    expect(result.current.result).toBe('2');
    expect(result.current.amount).toBe('2000');
  });

  it('recomputes the result when from/to change', () => {
    const { result } = renderHook(() => useUnitConverter());

    act(() => result.current.setTo('mile'));

    expect(result.current.to).toBe('mile');
    expect(Number(result.current.result)).toBeCloseTo(0.6214, 3);
  });
});
