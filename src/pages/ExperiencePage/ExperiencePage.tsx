import { useQuery } from '@tanstack/react-query';

import { ExperiencePageSkeleton } from './ExperiencePageSkeleton';
import { Eyebrow, QueryBoundary, TagList } from '@/components';
import { fetchExperience } from '@/content/api';

import styles from './ExperiencePage.module.css';

export function ExperiencePage() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['experience'],
    queryFn: fetchExperience,
  });

  return (
    <div>
      <Eyebrow>experience</Eyebrow>

      <QueryBoundary
        isPending={isPending}
        isError={isError}
        onRetry={refetch}
        loading={<ExperiencePageSkeleton />}
      >
        {data && (
          <ul className={styles.timeline}>
            {data.map((entry) => (
              <li key={`${entry.company}-${entry.years}`} className={styles.entry}>
                <span className={styles.years}>{entry.years}</span>
                <span className={styles.role}>{entry.role}</span>
                <span className={styles.company}>{entry.company}</span>
                <p className={styles.description}>{entry.description}</p>
                <TagList tags={entry.tags} />
              </li>
            ))}
          </ul>
        )}
      </QueryBoundary>
    </div>
  );
}
