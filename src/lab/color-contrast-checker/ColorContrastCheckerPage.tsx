import { useState } from 'react';

import { getContrastRatio } from './contrastRatio';
import { BackLink, Button, ColorField, Description } from '@/components';

import styles from './ColorContrastCheckerPage.module.css';

const AA_THRESHOLD = 4.5;
const AAA_THRESHOLD = 7;

export function ColorContrastCheckerPage() {
  const [foreground, setForeground] = useState('#000000');
  const [background, setBackground] = useState('#ffffff');

  // Round once and compare against the rounded figure, so the displayed
  // ratio and the pass/fail verdict can never disagree (e.g. a true ratio
  // of 4.495 must not show "4.50:1" next to "Fail").
  const ratio = Math.round(getContrastRatio(foreground, background) * 100) / 100;
  const passesAA = ratio >= AA_THRESHOLD;
  const passesAAA = ratio >= AAA_THRESHOLD;

  function handleSwap() {
    setForeground(background);
    setBackground(foreground);
  }

  return (
    <div>
      <BackLink to="/lab">Back to Lab</BackLink>

      <h2>Color Contrast Checker</h2>
      <Description>Compare two colors against WCAG AA/AAA contrast ratio thresholds.</Description>

      <div className={styles.fields}>
        <ColorField id="foreground" label="Foreground" value={foreground} onChange={setForeground} />
        <ColorField id="background" label="Background" value={background} onChange={setBackground} />

        <Button onClick={handleSwap}>Swap</Button>
      </div>

      <div className={styles.result}>
        <p className={styles.preview} style={{ color: foreground, background }}>
          The quick brown fox jumps over the lazy dog.
        </p>

        <p className={styles.ratio}>{ratio.toFixed(2)}:1</p>

        <ul className={styles.checks}>
          <li>
            AA (4.5:1): <strong className={passesAA ? styles.pass : styles.fail}>{passesAA ? 'Pass' : 'Fail'}</strong>
          </li>
          <li>
            AAA (7:1):{' '}
            <strong className={passesAAA ? styles.pass : styles.fail}>{passesAAA ? 'Pass' : 'Fail'}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
}
