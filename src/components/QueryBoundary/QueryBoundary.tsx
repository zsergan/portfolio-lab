import type { ReactNode } from 'react';
import { RetryButton } from '../RetryButton/RetryButton';
import styles from './QueryBoundary.module.css';

interface QueryBoundaryProps {
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
  children: ReactNode;
}

export function QueryBoundary({ isPending, isError, onRetry, children }: QueryBoundaryProps) {
  if (isPending) {
    return <p className={styles.loading}>Loading…</p>;
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
