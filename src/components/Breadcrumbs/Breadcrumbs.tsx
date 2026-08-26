import { Fragment } from 'react';
import { Link } from 'react-router';

import styles from './Breadcrumbs.module.css';

interface BreadcrumbItem {
  label: string;
  /** omit for the current page — renders as static text instead of a link */
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <div className={styles.breadcrumbs}>
      {items.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 && (
            <span className={styles.separator} aria-hidden="true">
              /
            </span>
          )}
          {item.to ? (
            <Link to={item.to} className={styles.link}>
              {item.label}
            </Link>
          ) : (
            <span className={styles.current}>{item.label}</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
