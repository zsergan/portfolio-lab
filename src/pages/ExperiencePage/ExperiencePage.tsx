import { useQuery } from '@tanstack/react-query';

import { JobEntry } from './components/JobEntry/JobEntry';
import { ExperiencePageSkeleton } from './ExperiencePageSkeleton';
import { Eyebrow, QueryBoundary, Skeleton } from '@/components';
import { fetchExperience } from '@/content/api';
import { formatDuration } from '@/content/duration';

import styles from './ExperiencePage.module.css';

export function ExperiencePage() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['experience'],
    queryFn: fetchExperience,
  });

  const maxMonths = data && data.length > 0 ? Math.max(...data.map((entry) => entry.months)) : 0;

  return (
    <div>
      <div className={styles.header}>
        <Eyebrow className={styles.eyebrow}>experience</Eyebrow>

        {data ? (
          <span className={styles.summary}>
            {formatDuration(data.reduce((sum, entry) => sum + entry.months, 0))} · {data.length}{' '}
            {data.length === 1 ? 'company' : 'companies'}
          </span>
        ) : (
          <Skeleton height={11} width={120} />
        )}
      </div>

      <QueryBoundary
        isPending={isPending}
        isError={isError}
        onRetry={refetch}
        loading={<ExperiencePageSkeleton />}
      >
        {data && (
          <ul className={styles.timeline}>
            {data.map((entry) => (
              <JobEntry key={`${entry.company}-${entry.years}`} entry={entry} maxMonths={maxMonths} />
            ))}
          </ul>
        )}
      </QueryBoundary>
    </div>
  );
}
