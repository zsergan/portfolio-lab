import { Skeleton } from '@/components';

import jobEntryStyles from './components/JobEntry/JobEntry.module.css';
import styles from './ExperiencePage.module.css';

export function ExperiencePageSkeleton() {
  return (
    <ul className={styles.timeline}>
      {[0, 1].map((i) => (
        <li key={i} className={jobEntryStyles.entry}>
          <div className={jobEntryStyles.meta}>
            <Skeleton height={12} width={72} />
            <Skeleton height={4} width="100%" radius={2} />
          </div>

          <div className={jobEntryStyles.content}>
            <div className={styles.entrySkeletonBody}>
              <Skeleton height={20} width="45%" />
              <Skeleton height={16} width="30%" />
              <Skeleton height={14} width="55%" />
              <Skeleton height={16} width="90%" />
            </div>

            <ul className={jobEntryStyles.highlights}>
              {[0, 1, 2].map((j) => (
                <li key={j} className={jobEntryStyles.highlight}>
                  <Skeleton height={14} width={j === 2 ? '60%' : '85%'} />
                </li>
              ))}
            </ul>

            <div className={styles.tagListSkeleton}>
              <Skeleton height={22} width={56} radius={4} />
              <Skeleton height={22} width={72} radius={4} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
