import { useQuery } from '@tanstack/react-query';
import { Eyebrow } from '@/components';
import { fetchContact } from '@/portfolio/api';
import pageStyles from '@/styles/portfolioPage.module.css';
import styles from './ContactPage.module.css';

export function ContactPage() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['contact'],
    queryFn: fetchContact,
  });

  return (
    <div>
      <Eyebrow>contact</Eyebrow>

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
        <ul className={styles.rowList}>
          {data.map((row) => (
            <li key={row.label} className={styles.row}>
              <span className={styles.label}>{row.label}</span>
              <a className={styles.value} href={row.href}>
                {row.value}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
