import type { ReactNode } from 'react';

import styles from './Description.module.css';

interface DescriptionProps {
  children: ReactNode;
  className?: string;
}

export function Description({ children, className }: DescriptionProps) {
  const combined = className ? `${styles.description} ${className}` : styles.description;
  return <p className={combined}>{children}</p>;
}
