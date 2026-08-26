import { useState } from 'react';

import { ColorSwapFields } from './components/ColorSwapFields/ColorSwapFields';
import { ContrastRatioDisplay } from './components/ContrastRatioDisplay/ContrastRatioDisplay';
import { LiveSamplePreview } from './components/LiveSamplePreview/LiveSamplePreview';
import { NearestPassingShades } from './components/NearestPassingShades/NearestPassingShades';
import { WcagChecksGrid } from './components/WcagChecksGrid/WcagChecksGrid';
import { getContrastRatio } from './utils/contrastRatio/contrastRatio';
import { findNearestPassingShades } from './utils/nearestPassingShades/nearestPassingShades';
import { BackLink, Description, WorkspaceCard } from '@/components';
import { useCopyToClipboard } from '@/hooks';

import styles from './ColorContrastCheckerPage.module.css';

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
            <ColorSwapFields
              foreground={foreground}
              background={background}
              onForegroundChange={setForeground}
              onBackgroundChange={setBackground}
              onSwap={handleSwap}
            />

            <ContrastRatioDisplay ratio={ratio} />

            <WcagChecksGrid ratio={ratio} />
          </div>

          <div className={styles.right}>
            <LiveSamplePreview foreground={foreground} background={background} />

            <NearestPassingShades shades={shades} onSelect={setForeground} />
          </div>
        </div>
      </WorkspaceCard>
    </div>
  );
}
