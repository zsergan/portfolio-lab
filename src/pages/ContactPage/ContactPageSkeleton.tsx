import { Skeleton } from '@/components';

import styles from './ContactPage.module.css';

export function ContactPageSkeleton() {
  return (
    <ul className={styles.rowList}>
      {[0, 1, 2, 3].map((i) => (
        <li key={i} className={styles.row}>
          <Skeleton height={16} width={72} />
          <Skeleton height={16} width={140} />
        </li>
      ))}
    </ul>
  );
}
