import { useState } from 'react';

import { ContrastRatioDisplay } from './components/ContrastRatioDisplay/ContrastRatioDisplay';
import { NearestPassingShades } from './components/NearestPassingShades/NearestPassingShades';
import { getContrastRatio } from './utils/contrastRatio/contrastRatio';
import { findNearestPassingShades } from './utils/nearestPassingShades/nearestPassingShades';
import { BackLink, Button, ColorField, Description, WorkspaceCard } from '@/components';
import { useCopyToClipboard } from '@/hooks';
import { SwapIcon } from '@/icons';

import styles from './ColorContrastCheckerPage.module.css';

const CHECKS = [
  { label: 'AA · normal', threshold: 4.5 },
  { label: 'AA · large', threshold: 3 },
  { label: 'AAA · normal', threshold: 7 },
  { label: 'AAA · large', threshold: 4.5 },
];

export function ColorContrastCheckerPage() {
  const [foreground, setForeground] = useState('#3d2f6b');
  const [background, setBackground] = useState('#f2eee4');
  const { status: copyStatus, copy } = useCopyToClipboard();

  const ratio = Math.round(getContrastRatio(foreground, background) * 100) / 100;
  const shades = findNearestPassingShades(foreground, background);

  function handleSwap() {
    setForeground(background);
    setBackground(foreground);
  }

  function handleCopyPair() {
    copy(`${foreground} / ${background}`);
  }

  const copyLabel = copyStatus === 'copied' ? 'Copied' : copyStatus === 'error' ? 'Copy failed' : 'Copy pair';

  return (
    <div>
      <BackLink to="/lab">Back to Lab</BackLink>

      <h2>Color Contrast Checker</h2>
      <Description>Compare two colors against WCAG AA/AAA contrast ratio thresholds.</Description>

      <WorkspaceCard
        filename="contrast.tsx"
        actions={[
          { label: 'Swap', onClick: handleSwap },
          { label: copyLabel, onClick: handleCopyPair },
        ]}
      >
        <div className={styles.body}>
          <div className={styles.left}>
            <div className={styles.fields}>
              <ColorField id="foreground" label="Foreground" value={foreground} onChange={setForeground} />

              <Button onClick={handleSwap} ariaLabel="Swap colors" className={styles.swapButton}>
                <SwapIcon />
              </Button>

              <ColorField id="background" label="Background" value={background} onChange={setBackground} />
            </div>

            <ContrastRatioDisplay ratio={ratio} />

            <ul className={styles.checks}>
              {CHECKS.map((check) => {
                const passes = ratio >= check.threshold;

                return (
                  <li key={check.label} className={styles.check}>
                    {check.label}
                    <strong className={passes ? styles.pass : styles.fail}>{passes ? 'pass' : 'fail'}</strong>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.right}>
            <p className={styles.microLabel}>Live Sample</p>

            <div className={styles.preview} style={{ color: foreground, background }}>
              <p className={styles.previewHeading}>Heading, 22px bold</p>
              <p className={styles.previewBody}>Body copy at 15px — the size most of the page actually uses.</p>
              <p className={styles.previewCaption}>Caption at 12px, the first thing to fail an audit.</p>
            </div>

            <NearestPassingShades shades={shades} onSelect={setForeground} />
          </div>
        </div>
      </WorkspaceCard>
    </div>
  );
}
