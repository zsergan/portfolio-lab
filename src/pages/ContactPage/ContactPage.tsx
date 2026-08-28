import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { AvailabilityBadge } from './components/AvailabilityBadge/AvailabilityBadge';
import { ContactPageSkeleton } from './ContactPageSkeleton';
import { Card, Eyebrow, QueryBoundary } from '@/components';
import { fetchContact } from '@/content/api';
import type { ContactRow } from '@/content/data';

import styles from './ContactPage.module.css';

// The design's own stated revert delay for these rows (the shared
// useCopyToClipboard hook's default of 1500ms is tuned for other tools,
// not this one).
const COPY_RESET_DELAY = 1600;

type RowStatus = 'idle' | 'copied' | 'error';

export function ContactPage() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['contact'],
    queryFn: fetchContact,
  });

  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);
  const [rowStatus, setRowStatus] = useState<RowStatus>('idle');
  const resetTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    return () => clearTimeout(resetTimeout.current);
  }, []);

  // A single shared useCopyToClipboard() instance can't say *which* row it
  // was called for, so — unlike every other copy button in this app, which
  // only ever copies one thing — this tracks status per click locally
  // instead: copiedLabel/rowStatus are only ever set *after* that row's
  // own write settles, so a stale result from a previous row can never
  // flash on a newly-clicked one before its real outcome is known.
  async function handleCopy(row: ContactRow) {
    clearTimeout(resetTimeout.current);

    try {
      await navigator.clipboard.writeText(row.value);
      setCopiedLabel(row.label);
      setRowStatus('copied');
    } catch {
      setCopiedLabel(row.label);
      setRowStatus('error');
    }

    resetTimeout.current = setTimeout(() => {
      setCopiedLabel(null);
      setRowStatus('idle');
    }, COPY_RESET_DELAY);
  }

  return (
    <div>
      <Eyebrow className={styles.eyebrow}>contact</Eyebrow>

      <QueryBoundary isPending={isPending} isError={isError} onRetry={refetch} loading={<ContactPageSkeleton />}>
        {data && (
          <>
            <AvailabilityBadge text={data.availability} className={styles.availability} />

            <h2 className={styles.headline}>{data.headline}</h2>

            <Card className={styles.rowsCard}>
              <ul className={styles.rowList}>
                {data.rows.map((row) => {
                  const isActive = copiedLabel === row.label;
                  const isCopied = isActive && rowStatus === 'copied';
                  const chipLabel = isCopied
                    ? 'copied ✓'
                    : isActive && rowStatus === 'error'
                      ? 'copy failed'
                      : 'copy';

                  return (
                    <li key={row.label}>
                      <button type="button" className={styles.row} onClick={() => handleCopy(row)}>
                        <span className={styles.label}>{row.label}</span>
                        <span className={styles.value}>{row.value}</span>
                        <span className={isCopied ? `${styles.chip} ${styles.chipCopied}` : styles.chip}>
                          {chipLabel}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Card>

            <p className={styles.footnote}>{data.footnote}</p>
          </>
        )}
      </QueryBoundary>
    </div>
  );
}
