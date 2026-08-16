import { Link, Outlet } from 'react-router';
import styles from './RootLayout.module.css';

export function RootLayout() {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <Link to="/" className={styles.titleLink}>
          <h1 className={styles.title}>React / TS Learning Sandbox</h1>
        </Link>
        <p className={styles.subtitle}>
          A personal interview-prep sandbox — one small, pokeable demo per topic.
        </p>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
