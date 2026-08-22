import { useQuery } from '@tanstack/react-query';
import { Eyebrow } from '@/components';
import { fetchAbout } from '@/portfolio/api';
import pageStyles from '@/styles/portfolioPage.module.css';
import styles from './AboutPage.module.css';

export function AboutPage() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['about'],
    queryFn: fetchAbout,
  });

  return (
    <div>
      <Eyebrow>about</Eyebrow>

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
        <>
          <h2 className={pageStyles.heading}>{data.heading}</h2>

          <div className={pageStyles.intro}>
            {data.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <hr className={pageStyles.divider} />

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
    </div>
  );
}
