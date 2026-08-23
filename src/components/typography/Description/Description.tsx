import type { ReactNode } from 'react';

import styles from './Description.module.css';

export function Description({ children }: { children: ReactNode }) {
  return <p className={styles.description}>{children}</p>;
}
