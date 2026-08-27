import { useMemo } from 'react';

import { computeJsonStats } from '../utils/jsonStats/jsonStats';

export type FormatState =
  | { status: 'idle' }
  | { status: 'valid'; pretty: string; minified: string; keyCount: number; depth: number }
  | { status: 'error'; message: string };

export function useJsonFormat(input: string): FormatState {
  return useMemo(() => {
    if (input.trim() === '') return { status: 'idle' };

    try {
      const parsed: unknown = JSON.parse(input);
      const { keyCount, depth } = computeJsonStats(parsed);

      return {
        status: 'valid',
        pretty: JSON.stringify(parsed, null, 2),
        minified: JSON.stringify(parsed),
        keyCount,
        depth,
      };
    } catch (error) {
      return { status: 'error', message: error instanceof Error ? error.message : 'Invalid JSON' };
    }
  }, [input]);
}
