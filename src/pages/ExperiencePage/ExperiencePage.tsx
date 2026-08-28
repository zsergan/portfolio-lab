import { useQuery } from '@tanstack/react-query';

import { JobEntry } from './components/JobEntry/JobEntry';
import { ExperiencePageSkeleton } from './ExperiencePageSkeleton';
import { Eyebrow, QueryBoundary } from '@/components';
import { fetchExperience } from '@/content/api';

import styles from './ExperiencePage.module.css';

export function ExperiencePage() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['experience'],
    queryFn: fetchExperience,
  });

  const maxMonths = data && data.length > 0 ? Math.max(...data.map((entry) => entry.months)) : 0;

  return (
    <div>
      <Eyebrow className={styles.eyebrow}>experience</Eyebrow>

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
