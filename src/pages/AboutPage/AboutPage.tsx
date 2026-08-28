import { useQuery } from '@tanstack/react-query';

import { AboutPageSkeleton } from './AboutPageSkeleton';
import { CurrentlyCard } from './components/CurrentlyCard/CurrentlyCard';
import { StatsGrid } from './components/StatsGrid/StatsGrid';
import { Eyebrow, QueryBoundary } from '@/components';
import { fetchAbout } from '@/content/api';
import { labTools } from '@/lab/registry';

import styles from './AboutPage.module.css';

export function AboutPage() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['about'],
    queryFn: fetchAbout,
  });

  const shippedCount = labTools.filter((tool) => tool.status === 'done').length;

  return (
    <div>
      <Eyebrow className={styles.eyebrow}>about</Eyebrow>

      <QueryBoundary isPending={isPending} isError={isError} onRetry={refetch} loading={<AboutPageSkeleton />}>
        {data && (
          <>
            <h2 className={styles.heading}>{data.heading}</h2>

            <div className={styles.intro}>
              {data.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <StatsGrid
              className={styles.stats}
              stats={[...data.stats, { value: `${shippedCount}/${labTools.length}`, label: 'Lab Tools Shipped' }]}
            />

            <CurrentlyCard updated={data.currentlyUpdated} lines={data.currentlyLines} />
          </>
        )}
      </QueryBoundary>
    </div>
  );
}
