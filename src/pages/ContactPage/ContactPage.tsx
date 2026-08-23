import { useQuery } from '@tanstack/react-query';

import { ContactPageSkeleton } from './ContactPageSkeleton';
import { Eyebrow, QueryBoundary } from '@/components';
import { fetchContact } from '@/content/api';

import styles from './ContactPage.module.css';

export function ContactPage() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['contact'],
    queryFn: fetchContact,
  });

  return (
    <div>
      <Eyebrow>contact</Eyebrow>

      <QueryBoundary isPending={isPending} isError={isError} onRetry={refetch} loading={<ContactPageSkeleton />}>
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
      </QueryBoundary>
    </div>
  );
}
