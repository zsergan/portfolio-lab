import type { ReactNode } from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: ReactNode;
}

export function Button({ onClick, disabled, children }: ButtonProps) {
  return (
    <button type="button" className={styles.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
