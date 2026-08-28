import { Card, Skeleton } from '@/components';

import styles from './AboutPage.module.css';
import currentlyStyles from './components/CurrentlyCard/CurrentlyCard.module.css';
import statsStyles from './components/StatsGrid/StatsGrid.module.css';

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

      <div className={`${statsStyles.grid} ${styles.stats}`}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={statsStyles.cell}>
            <Skeleton height={22} width={40} />
            <Skeleton height={11} width={64} />
          </div>
        ))}
      </div>

      <Card className={currentlyStyles.card}>
        <div className={currentlyStyles.header}>
          <Skeleton height={12} width={90} />
          <Skeleton height={11} width={110} />
        </div>

        {[0, 1, 2].map((i) => (
          <div key={i} className={currentlyStyles.row}>
            <Skeleton height={11} width={60} />
            <Skeleton height={14} width="80%" />
          </div>
        ))}
      </Card>
    </>
  );
}
