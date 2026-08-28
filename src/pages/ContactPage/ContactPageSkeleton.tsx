import { Card, Skeleton } from '@/components';

import badgeStyles from './components/AvailabilityBadge/AvailabilityBadge.module.css';
import styles from './ContactPage.module.css';

export function ContactPageSkeleton() {
  return (
    <>
      <div className={badgeStyles.badge}>
        <Skeleton height={7} width={7} radius="50%" />
        <Skeleton height={12} width={180} />
      </div>

      <div className={styles.headline}>
        <Skeleton height={26} width="70%" />
      </div>

      <Card className={styles.rowsCard}>
        <ul className={styles.rowList}>
          {[0, 1, 2].map((i) => (
            <li key={i}>
              <div className={styles.row}>
                <Skeleton height={14} width={60} />
                <Skeleton height={14} width={140} />
              </div>
            </li>
          ))}
        </ul>
      </Card>

      <Skeleton height={14} width={260} />
    </>
  );
}
