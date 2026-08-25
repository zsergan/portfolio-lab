import type { ReactNode } from 'react';

import { Label } from '../Label/Label';

import styles from './TextAreaOutput.module.css';

interface TextAreaOutputProps {
  status: 'idle' | 'valid' | 'error';
  content: string;
  hint: ReactNode;
  label?: string;
  actions?: ReactNode;
  headerClassName?: string;
}

export function TextAreaOutput({ status, content, hint, label, actions, headerClassName }: TextAreaOutputProps) {
  const headerClasses = headerClassName ? `${styles.header} ${headerClassName}` : styles.header;

  return (
    <div className={styles.field}>
      {(label || actions) && (
        <div className={headerClasses}>
          {label && <Label>{label}</Label>}
          {actions}
        </div>
      )}

      <div className={status === 'error' ? `${styles.outputBox} ${styles.outputBoxInvalid}` : styles.outputBox}>
        {status === 'idle' && <p className={styles.hint}>{hint}</p>}
        {status === 'valid' && (
          <pre className={styles.output} data-testid="text-area-output">
            {content}
          </pre>
        )}
      </div>
    </div>
  );
}
