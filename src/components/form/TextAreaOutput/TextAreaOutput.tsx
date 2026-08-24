import type { ReactNode } from 'react';

import styles from './TextAreaOutput.module.css';

interface TextAreaOutputProps {
  status: 'idle' | 'valid' | 'error';
  content: string;
  hint: ReactNode;
  errorMessage: string | null;
  errorId: string;
}

export function TextAreaOutput({ status, content, hint, errorMessage, errorId }: TextAreaOutputProps) {
  return (
    <div className={styles.outputBox}>
      {status === 'idle' && <p className={styles.hint}>{hint}</p>}
      {status === 'valid' && (
        <pre className={styles.output} data-testid="text-area-output">
          {content}
        </pre>
      )}
      <p id={errorId} role="status" className={styles.error}>
        {status === 'error' ? errorMessage : null}
      </p>
    </div>
  );
}
