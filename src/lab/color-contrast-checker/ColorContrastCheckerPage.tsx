import { useState } from 'react';

import { ColorSwapFields } from './components/ColorSwapFields/ColorSwapFields';
import { ContrastRatioDisplay } from './components/ContrastRatioDisplay/ContrastRatioDisplay';
import { LiveSamplePreview } from './components/LiveSamplePreview/LiveSamplePreview';
import { NearestPassingShades } from './components/NearestPassingShades/NearestPassingShades';
import { WcagChecksGrid } from './components/WcagChecksGrid/WcagChecksGrid';
import { getContrastRatio } from './utils/contrastRatio/contrastRatio';
import { findNearestPassingShades } from './utils/nearestPassingShades/nearestPassingShades';
import { Breadcrumbs, BuildNoteCard, NextToolCard, ShortcutsCard, ToolIntro, WorkspaceCard } from '@/components';
import { useCopyToClipboard, useKeyboardShortcuts } from '@/hooks';

import styles from './ColorContrastCheckerPage.module.css';

export function ColorContrastCheckerPage() {
  const [foreground, setForeground] = useState('#3d2f6b');
  const [background, setBackground] = useState('#f2eee4');
  const { status: copyStatus, copy } = useCopyToClipboard();

  const ratio = Math.round(getContrastRatio(foreground, background) * 100) / 100;
  const { shades, allPass } = findNearestPassingShades(foreground, background);

  function handleSwap() {
    setForeground(background);
    setBackground(foreground);
  }

  function handleCopyPair() {
    copy(`${foreground} / ${background}`);
  }

  const copyLabel = copyStatus === 'copied' ? 'Copied' : copyStatus === 'error' ? 'Copy failed' : 'Copy pair';

  const shortcuts = [
    { label: 'Swap colors', combo: 'mod+s', onTrigger: handleSwap },
    { label: 'Copy pair', combo: 'mod+c', onTrigger: handleCopyPair },
    { label: 'Use nearest shade', combo: 'n', onTrigger: () => setForeground(shades[0]) },
  ];

  useKeyboardShortcuts(shortcuts);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'lab', to: '/lab' }, { label: 'color-contrast-checker' }]} />
      <ToolIntro toolId="color-contrast-checker" />

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

            <NearestPassingShades shades={shades} allPass={allPass} onSelect={setForeground} />
          </div>
        </div>
      </WorkspaceCard>

      <div className={styles.bottomRow}>
        <BuildNoteCard toolId="color-contrast-checker" />

        <div className={styles.sidebar}>
          <ShortcutsCard shortcuts={shortcuts} />
          <NextToolCard currentToolId="color-contrast-checker" />
        </div>
      </div>
    </div>
  );
}
