import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useCopyToClipboard } from './useCopyToClipboard';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useCopyToClipboard', () => {
  it('sets status to "copied", then resets to "idle" after the delay', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
    });

    const { result } = renderHook(() => useCopyToClipboard(1000));
    expect(result.current.status).toBe('idle');

    await act(async () => {
      await result.current.copy('hello');
    });
    expect(result.current.status).toBe('copied');

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.status).toBe('idle');
  });

  it('sets status to "error" when the clipboard write fails, then resets to "idle"', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
      configurable: true,
    });

    const { result } = renderHook(() => useCopyToClipboard(1000));

    await act(async () => {
      await result.current.copy('hello');
    });
    expect(result.current.status).toBe('error');

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.status).toBe('idle');
  });
});
