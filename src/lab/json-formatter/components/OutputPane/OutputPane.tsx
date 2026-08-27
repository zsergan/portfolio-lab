import styles from './OutputPane.module.css';

interface OutputPaneProps {
  status: 'idle' | 'valid' | 'error';
  content: string;
  meta: string;
  hint: string;
}

export function OutputPane({ status, content, meta, hint }: OutputPaneProps) {
  return (
    <div className={styles.pane}>
      <div className={styles.header}>
        <span className={styles.label}>OUTPUT</span>
        <span className={styles.meta}>{status === 'valid' ? meta : '—'}</span>
      </div>

      <div className={styles.body}>
        {status === 'idle' && <p className={styles.hint}>{hint}</p>}
        {status === 'valid' && (
          <pre className={styles.output} data-testid="json-output">
            {content}
          </pre>
        )}
      </div>
    </div>
  );
}
