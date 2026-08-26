import type { ReactNode } from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary';
  children: ReactNode;
}

export function Button({ onClick, disabled, ariaLabel, className, variant = 'default', children }: ButtonProps) {
  const combined = className ? `${styles[variant]} ${className}` : styles[variant];

  return (
    <button type="button" className={combined} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
