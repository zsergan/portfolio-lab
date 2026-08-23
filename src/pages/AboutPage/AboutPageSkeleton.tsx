import { Skeleton } from '@/components';

import styles from './AboutPage.module.css';

export function AboutPageSkeleton() {
  return (
    <>
      <div className={styles.headingSkeleton}>
        <Skeleton height={32} width="75%" />
      </div>

      <div className={styles.intro}>
        <Skeleton height={16} width="100%" />
        <Skeleton height={16} width="92%" />
        <Skeleton height={16} width="68%" />
      </div>

      <hr className={styles.divider} />

      <ul className={styles.statList}>
        {[0, 1, 2].map((i) => (
          <li key={i} className={styles.stat}>
            <Skeleton height={22} width={40} />
            <Skeleton height={11} width={64} />
          </li>
        ))}
      </ul>
    </>
  );
}
