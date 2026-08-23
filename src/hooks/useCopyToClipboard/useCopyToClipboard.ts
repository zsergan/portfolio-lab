import { useEffect, useRef, useState } from 'react';

export type CopyStatus = 'idle' | 'copied' | 'error';

export function useCopyToClipboard(resetDelay = 1500) {
  const [status, setStatus] = useState<CopyStatus>('idle');
  const resetTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => clearTimeout(resetTimeout.current);
  }, []);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
    } catch {
      // navigator.clipboard.writeText rejects when permission is denied,
      // the page isn't in a secure context, or the API isn't supported —
      // surface it as an error status instead of failing silently.
      setStatus('error');
    }

    // Cancel any pending reset from an earlier call so a rapid second copy
    // doesn't get cut short by the first call's timer.
    clearTimeout(resetTimeout.current);
    resetTimeout.current = setTimeout(() => setStatus('idle'), resetDelay);
  }

  return { status, copy };
}
