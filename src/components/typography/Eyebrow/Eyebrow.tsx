import type { ReactNode } from 'react';

import styles from './Eyebrow.module.css';

interface EyebrowProps {
  children: ReactNode;
  variant?: 'accent' | 'muted';
  className?: string;
}

export function Eyebrow({ children, variant = 'accent', className }: EyebrowProps) {
  const combined = [styles.eyebrow, styles[variant], className].filter(Boolean).join(' ');

  return <p className={combined}>// {children}</p>;
}
