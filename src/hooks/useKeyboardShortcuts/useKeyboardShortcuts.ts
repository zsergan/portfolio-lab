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
  return target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable;
}

// A non-collapsed selection — either inside a focused input/textarea (which
// doesn't show up in window.getSelection(), only via selectionStart/End) or
// on the page itself — means the user is mid-selection and likely reaching
// for the browser's own Cmd/Ctrl+C, not this hook's shortcuts. Deferring to
// the browser here regardless of which combo matched (not just "c") keeps
// the rule simple and avoids the hook needing to know which keys are
// copy-like.
function hasTextSelected(): boolean {
  const active = document.activeElement;
  if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) {
    if (active.selectionStart !== active.selectionEnd) return true;
  }

  const selection = window.getSelection();
  return !!selection && selection.toString().length > 0;
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
      // to contain the letter. Modifier combos are safe regardless of focus,
      // except when the user has text selected (see hasTextSelected).
      if (!shortcut.combo.includes('mod') && isTypingTarget(event.target)) return;
      if (hasTextSelected()) return;

      event.preventDefault();
      shortcut.onTrigger();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
}
