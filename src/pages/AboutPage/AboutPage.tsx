import { useQuery } from '@tanstack/react-query';

import { AboutPageSkeleton } from './AboutPageSkeleton';
import { Eyebrow, QueryBoundary } from '@/components';
import { fetchAbout } from '@/content/api';

import styles from './AboutPage.module.css';

export function AboutPage() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['about'],
    queryFn: fetchAbout,
  });

  return (
    <div>
      <Eyebrow>about</Eyebrow>

      <QueryBoundary isPending={isPending} isError={isError} onRetry={refetch} loading={<AboutPageSkeleton />}>
        {data && (
          <>
            <h2 className={styles.heading}>{data.heading}</h2>

            <div className={styles.intro}>
              {data.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <hr className={styles.divider} />

            <ul className={styles.statList}>
              {data.stats.map((stat) => (
                <li key={stat.label} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </QueryBoundary>
    </div>
  );
}
