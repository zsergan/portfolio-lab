import type { ReactNode } from 'react';

import styles from './Label.module.css';

interface LabelProps {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}

export function Label({ children, htmlFor, className }: LabelProps) {
  const combined = className ? `${styles.label} ${className}` : styles.label;

  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={combined}>
        {children}
      </label>
    );
  }

  return <span className={combined}>{children}</span>;
}
