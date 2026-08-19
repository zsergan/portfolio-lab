import styles from './PortfolioHome.module.css';

export function PortfolioHome() {
  return (
    <div>
      <section className={styles.section} aria-labelledby="about-heading">
        <h2 id="about-heading" className={styles.sectionTitle}>
          About
        </h2>
        {/* TODO: replace with real bio */}
        <p>Your name — Frontend Engineer.</p>
        <p>Short bio goes here.</p>
      </section>

      <section className={styles.section} aria-labelledby="experience-heading">
        <h2 id="experience-heading" className={styles.sectionTitle}>
          Experience
        </h2>
        {/* TODO: replace with real experience */}
        <ul className={styles.list}>
          <li>Role — Company (Year–Year)</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="stack-heading">
        <h2 id="stack-heading" className={styles.sectionTitle}>
          Stack
        </h2>
        {/* TODO: replace with real stack */}
        <ul className={styles.tagList}>
          <li className={styles.tag}>React</li>
          <li className={styles.tag}>TypeScript</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="contact-heading">
        <h2 id="contact-heading" className={styles.sectionTitle}>
          Contact
        </h2>
        {/* TODO: replace with real links */}
        <ul className={styles.list}>
          <li>
            <a href="#">GitHub</a>
          </li>
          <li>
            <a href="#">LinkedIn</a>
          </li>
          <li>
            <a href="#">Resume</a>
          </li>
        </ul>
      </section>
    </div>
  );
}
