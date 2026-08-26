import { useEffect, useRef } from 'react';

export interface Shortcut {
  combo: string;
  onTrigger: () => void;
}

const NAMED_KEYS: Record<string, string> = {
  enter: 'Enter',
  backspace: 'Backspace',
  tab: 'Tab',
  escape: 'Escape',
};

function matchesCombo(event: KeyboardEvent, combo: string): boolean {
  const parts = combo.toLowerCase().split('+');
  const key = parts[parts.length - 1];
  const modifiers = parts.slice(0, -1);

  if (modifiers.includes('mod') !== (event.metaKey || event.ctrlKey)) return false;
  if (modifiers.includes('shift') !== event.shiftKey) return false;
  if (modifiers.includes('alt') !== event.altKey) return false;

  const expectedKey = NAMED_KEYS[key] ?? key;
  return event.key.toLowerCase() === expectedKey.toLowerCase();
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
}

// Reads the current shortcuts through a ref, rather than depending on them
// directly, so the listener is attached once instead of being torn down and
// re-attached on every render a page's onTrigger closures are recreated.
export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  const shortcutsRef = useRef(shortcuts);

  // Ref mutations must happen in an effect, not during render — this one
  // has no dependency array so it runs after every render, keeping the ref
  // fresh for the mount-only listener effect below to read.
  useEffect(() => {
    shortcutsRef.current = shortcuts;
  });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const shortcut = shortcutsRef.current.find((candidate) => matchesCombo(event, candidate.combo));
      if (!shortcut) return;

      // A bare key (no modifier) must not fire while the user is typing —
      // e.g. "n" shouldn't trigger while entering a hex value that happens
      // to contain the letter. Modifier combos are safe regardless of focus.
      if (!shortcut.combo.includes('mod') && isTypingTarget(event.target)) return;

      event.preventDefault();
      shortcut.onTrigger();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
}
