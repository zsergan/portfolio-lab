import { useMemo } from 'react';

export type FormatState =
  | { status: 'idle' }
  | { status: 'valid'; pretty: string; minified: string }
  | { status: 'error'; message: string };

export function useJsonFormat(input: string): FormatState {
  return useMemo(() => {
    if (input.trim() === '') return { status: 'idle' };

    try {
      const parsed: unknown = JSON.parse(input);
      return {
        status: 'valid',
        pretty: JSON.stringify(parsed, null, 2),
        minified: JSON.stringify(parsed),
      };
    } catch (error) {
      return { status: 'error', message: error instanceof Error ? error.message : 'Invalid JSON' };
    }
  }, [input]);
}
