import type { ReactNode } from 'react';

import { RetryButton } from '../RetryButton/RetryButton';

import styles from './QueryBoundary.module.css';

interface QueryBoundaryProps {
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
  loading: ReactNode;
  children: ReactNode;
}

export function QueryBoundary({ isPending, isError, onRetry, loading, children }: QueryBoundaryProps) {
  if (isPending) {
    return (
      <div role="status" aria-live="polite">
        {loading}
        <span className="sr-only">Loading…</span>
      </div>
    );
  }

  if (isError) {
    return (
      <p className={styles.error}>
        Couldn't load this page.
        <RetryButton onClick={onRetry} />
      </p>
    );
  }

  return <>{children}</>;
}
