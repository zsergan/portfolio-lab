import { Link, NavLink, Outlet } from 'react-router';
import styles from './RootLayout.module.css';

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
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink)}
            >
              About
            </NavLink>

            <NavLink
              to="/experience"
              className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink)}
            >
              Experience
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink)}
            >
              Contact
            </NavLink>

            <NavLink
              to="/lab"
              className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink)}
            >
              Lab
            </NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
