import { useQuery } from '@tanstack/react-query';
import { Eyebrow } from '@/components/Eyebrow/Eyebrow';
import { fetchExperience } from '@/portfolio/api';
import pageStyles from '@/styles/portfolioPage.module.css';
import styles from './ExperiencePage.module.css';

export function ExperiencePage() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['experience'],
    queryFn: fetchExperience,
  });

  return (
    <div>
      <Eyebrow>experience</Eyebrow>

      {isPending && <p className={pageStyles.loading}>Loading…</p>}

      {isError && (
        <p className={pageStyles.error}>
          Couldn't load this page.
          <button className={pageStyles.retryButton} onClick={() => refetch()}>
            Try again
          </button>
        </p>
      )}

      {data && (
        <ul className={styles.timeline}>
          {data.map((entry) => (
            <li key={`${entry.company}-${entry.years}`} className={styles.entry}>
              <span className={styles.years}>{entry.years}</span>
              <span className={styles.role}>{entry.role}</span>
              <span className={styles.company}>{entry.company}</span>
              <p className={styles.description}>{entry.description}</p>
              <ul className={styles.tagList}>
                {entry.tags.map((tag) => (
                  <li key={tag} className={styles.tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
