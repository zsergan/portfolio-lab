import { useLayoutEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router';

import styles from './RootLayout.module.css';

interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

interface NavPillRect {
  left: number;
  width: number;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'About', end: true },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
  { to: '/lab', label: 'Lab' },
];

export function RootLayout() {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const [pillRect, setPillRect] = useState<NavPillRect | null>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    function measure() {
      const activeLink = nav?.querySelector<HTMLElement>('[aria-current="page"]');
      if (!activeLink || !nav) return;

      const navRect = nav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setPillRect({ left: linkRect.left - navRect.left, width: linkRect.width });
    }

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [location.pathname]);

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link to="/" className={styles.titleLink}>
            <h1 className={styles.title}>Zakhar Sergan</h1>

            <div className={styles.role}>Senior Software Engineer</div>
          </Link>

          <nav className={styles.nav} aria-label="Main" ref={navRef}>
            {pillRect && (
              <span
                aria-hidden="true"
                className={styles.navPill}
                style={{ transform: `translateX(${pillRect.left}px)`, width: pillRect.width }}
              />
            )}

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
