import { Link, NavLink, Outlet } from 'react-router';
import styles from './RootLayout.module.css';

export function RootLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to="/" className={styles.titleLink}>
          <h1 className={styles.title}>Your Name</h1>
        </Link>
        <nav className={styles.nav} aria-label="Main">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink)}
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/lab"
            className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink)}
          >
            Lab
          </NavLink>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
