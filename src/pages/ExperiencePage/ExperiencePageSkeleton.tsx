import { Skeleton } from '@/components';

import styles from './ExperiencePage.module.css';

export function ExperiencePageSkeleton() {
  return (
    <ul className={styles.timeline}>
      {[0, 1].map((i) => (
        <li key={i} className={styles.entry}>
          <div className={styles.entrySkeletonBody}>
            <Skeleton height={12} width={72} />
            <Skeleton height={20} width="45%" />
            <Skeleton height={16} width="30%" />
            <Skeleton height={16} width="90%" />
          </div>
          <div className={styles.tagListSkeleton}>
            <Skeleton height={22} width={56} radius={4} />
            <Skeleton height={22} width={72} radius={4} />
          </div>
        </li>
      ))}
    </ul>
  );
}
