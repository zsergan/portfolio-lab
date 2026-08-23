import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useJsonFormat } from './useJsonFormat';

describe('useJsonFormat', () => {
  it('is idle for empty or whitespace-only input', () => {
    expect(renderHook(() => useJsonFormat('')).result.current).toEqual({ status: 'idle' });
    expect(renderHook(() => useJsonFormat('   ')).result.current).toEqual({ status: 'idle' });
  });

  it('pretty-prints and minifies valid JSON', () => {
    const { result } = renderHook(() => useJsonFormat('{"a":1}'));

    expect(result.current).toEqual({
      status: 'valid',
      pretty: '{\n  "a": 1\n}',
      minified: '{"a":1}',
    });
  });

  it('reports a parse error for invalid JSON', () => {
    const { result } = renderHook(() => useJsonFormat('{invalid'));

    expect(result.current.status).toBe('error');
    expect(result.current).toHaveProperty('message');
  });

  it('memoizes the result across re-renders with the same input', () => {
    const { result, rerender } = renderHook(({ input }) => useJsonFormat(input), {
      initialProps: { input: '{"a":1}' },
    });
    const first = result.current;

    rerender({ input: '{"a":1}' });

    expect(result.current).toBe(first);
  });
});
