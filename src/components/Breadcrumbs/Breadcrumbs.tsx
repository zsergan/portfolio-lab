import { Link } from 'react-router';

import styles from './Breadcrumbs.module.css';

interface BreadcrumbsProps {
  slug: string;
}

export function Breadcrumbs({ slug }: BreadcrumbsProps) {
  return (
    <div className={styles.breadcrumbs}>
      <Link to="/lab" className={styles.lab}>
        lab
      </Link>
      <span className={styles.separator} aria-hidden="true">
        /
      </span>
      <span className={styles.slug}>{slug}</span>
    </div>
  );
}
