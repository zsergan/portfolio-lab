import type { ReactNode } from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  children: ReactNode;
}

export function Button({ onClick, disabled, ariaLabel, className, children }: ButtonProps) {
  const combined = className ? `${styles.button} ${className}` : styles.button;

  return (
    <button type="button" className={combined} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
