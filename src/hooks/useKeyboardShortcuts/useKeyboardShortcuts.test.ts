import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { useKeyboardShortcuts } from './useKeyboardShortcuts';

// Dispatched on the focused element (falling back to document) rather than
// document directly, so event.target matches what a real keydown carries as
// it bubbles up from wherever focus actually is — needed for the
// typing-target guard's tests to exercise the real code path.
function pressKey(init: KeyboardEventInit) {
  const event = new KeyboardEvent('keydown', { bubbles: true, cancelable: true, ...init });
  const preventDefault = vi.spyOn(event, 'preventDefault');
  (document.activeElement ?? document).dispatchEvent(event);
  return preventDefault;
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('useKeyboardShortcuts', () => {
  it('fires onTrigger and prevents the default action when a combo matches', () => {
    const onTrigger = vi.fn();
    renderHook(() => useKeyboardShortcuts([{ combo: 'mod+s', onTrigger }]));

    let preventDefault!: ReturnType<typeof vi.spyOn>;
    act(() => {
      preventDefault = pressKey({ key: 's', metaKey: true });
    });

    expect(onTrigger).toHaveBeenCalledOnce();
    expect(preventDefault).toHaveBeenCalledOnce();
  });

  it('ignores a bare-key combo while an input is focused', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    const onTrigger = vi.fn();
    renderHook(() => useKeyboardShortcuts([{ combo: 'n', onTrigger }]));

    act(() => {
      pressKey({ key: 'n' });
    });

    expect(onTrigger).not.toHaveBeenCalled();
  });

  it('fires a bare-key combo when focus is not on a typing target', () => {
    const onTrigger = vi.fn();
    renderHook(() => useKeyboardShortcuts([{ combo: 'n', onTrigger }]));

    act(() => {
      pressKey({ key: 'n' });
    });

    expect(onTrigger).toHaveBeenCalledOnce();
  });

  it('fires a modifier combo even while an input is focused', () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.focus();

    const onTrigger = vi.fn();
    renderHook(() => useKeyboardShortcuts([{ combo: 'mod+c', onTrigger }]));

    act(() => {
      pressKey({ key: 'c', ctrlKey: true });
    });

    expect(onTrigger).toHaveBeenCalledOnce();
  });

  it('does not fire once the component unmounts', () => {
    const onTrigger = vi.fn();
    const { unmount } = renderHook(() => useKeyboardShortcuts([{ combo: 'n', onTrigger }]));

    unmount();
    act(() => {
      pressKey({ key: 'n' });
    });

    expect(onTrigger).not.toHaveBeenCalled();
  });
});
