import type { ReactNode } from 'react';

import styles from './Caption.module.css';

interface CaptionProps {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}

export function Caption({ children, htmlFor, className }: CaptionProps) {
  const combined = className ? `${styles.caption} ${className}` : styles.caption;

  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className={combined}>
        {children}
      </label>
    );
  }

  return <span className={combined}>{children}</span>;
}
