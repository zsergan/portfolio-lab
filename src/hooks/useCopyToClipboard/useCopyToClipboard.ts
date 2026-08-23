import { useState } from 'react';

export type CopyStatus = 'idle' | 'copied' | 'error';

export function useCopyToClipboard(resetDelay = 1500) {
  const [status, setStatus] = useState<CopyStatus>('idle');

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
    setTimeout(() => setStatus('idle'), resetDelay);
  }

  return { status, copy };
}
