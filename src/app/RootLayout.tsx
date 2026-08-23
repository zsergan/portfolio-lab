import { Link, NavLink, Outlet } from 'react-router';

import styles from './RootLayout.module.css';

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'About', end: true },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
  { to: '/lab', label: 'Lab' },
];

export function RootLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.titleLink}>
            <h1 className={styles.title}>Zakhar Sergan</h1>

            <div className={styles.role}>Senior Software Engineer</div>
          </Link>

          <nav className={styles.nav} aria-label="Main">
            {NAV_ITEMS.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <span>Zakhar Sergan</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
