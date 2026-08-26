import type { ReactNode } from 'react';

import styles from './Eyebrow.module.css';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className }: EyebrowProps) {
  const combined = className ? `${styles.eyebrow} ${className}` : styles.eyebrow;

  return <p className={combined}>// {children}</p>;
}
