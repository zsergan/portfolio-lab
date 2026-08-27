import type { ReactNode } from 'react';

import styles from './Tag.module.css';

interface TagProps {
  children: ReactNode;
  variant?: 'default' | 'muted';
}

export function Tag({ children, variant = 'default' }: TagProps) {
  const className = variant === 'muted' ? `${styles.tag} ${styles.muted}` : styles.tag;
  return <span className={className}>{children}</span>;
}
