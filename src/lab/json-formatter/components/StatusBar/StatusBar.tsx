import styles from './StatusBar.module.css';

interface StatusBarProps {
  id: string;
  status: 'idle' | 'valid' | 'error';
  message?: string;
  keyCount?: number;
  depth?: number;
}

export function StatusBar({ id, status, message, keyCount, depth }: StatusBarProps) {
  if (status === 'idle') {
    return (
      <div className={styles.bar}>
        <span className={styles.idle}>Waiting for input</span>
      </div>
    );
  }

  const dotClassName = status === 'valid' ? `${styles.dot} ${styles.dotValid}` : `${styles.dot} ${styles.dotError}`;
  const labelClassName = status === 'valid' ? styles.labelValid : styles.labelError;
  const detail = status === 'valid' ? `${keyCount} keys · depth ${depth}` : message;

  return (
    <div className={styles.bar}>
      {/* One live region covering both the label and the detail, so a
          screen reader announces "invalid JSON" together with the parse
          error, not as two disconnected updates. */}
      <span id={id} role="status" className={styles.group}>
        <span className={dotClassName} aria-hidden="true" />
        <span className={labelClassName}>{status === 'valid' ? 'valid JSON' : 'invalid JSON'}</span>
        <span className={styles.divider}>|</span>
        <span className={styles.detail}>{detail}</span>
      </span>
    </div>
  );
}
