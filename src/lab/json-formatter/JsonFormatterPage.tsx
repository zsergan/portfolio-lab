import { useState } from 'react';

import { InputPane } from './components/InputPane/InputPane';
import { OutputPane } from './components/OutputPane/OutputPane';
import { StatusBar } from './components/StatusBar/StatusBar';
import { useJsonFormat } from './hooks/useJsonFormat';
import { Breadcrumbs, BuildNoteCard, NextToolCard, ShortcutsCard, ToolIntro, WorkspaceCard } from '@/components';
import { useCopyToClipboard, useKeyboardShortcuts } from '@/hooks';

import styles from './JsonFormatterPage.module.css';

type Mode = 'pretty' | 'minify';

const INPUT_ID = 'json-formatter-input';
const STATUS_ID = 'json-formatter-status';

export function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<Mode>('pretty');

  const state = useJsonFormat(input);
  const output = state.status === 'valid' ? (mode === 'pretty' ? state.pretty : state.minified) : '';
  const outputMeta = mode === 'pretty' ? 'pretty · 2 spaces' : 'minified';
  const { status: copyStatus, copy } = useCopyToClipboard();

  function handleClear() {
    setInput('');
    setMode('pretty');
  }

  function handleCopy() {
    copy(output);
  }

  function toggleMode() {
    setMode((current) => (current === 'pretty' ? 'minify' : 'pretty'));
  }

  const copyLabel = copyStatus === 'copied' ? 'Copied' : copyStatus === 'error' ? 'Copy failed' : 'Copy';

  const shortcuts = [
    { label: 'Toggle format', combo: 'mod+enter', onTrigger: toggleMode },
    { label: 'Copy output', combo: 'mod+c', onTrigger: handleCopy },
    { label: 'Clear panes', combo: 'mod+backspace', onTrigger: handleClear },
  ];

  useKeyboardShortcuts(shortcuts);

  return (
    <div>
      <Breadcrumbs items={[{ label: 'lab', to: '/lab' }, { label: 'json-formatter' }]} />
      <ToolIntro toolId="json-formatter" />

      <WorkspaceCard
        filename="json-formatter.tsx"
        actions={[
          { label: 'Pretty', onClick: () => setMode('pretty'), active: mode === 'pretty' },
          { label: 'Minify', onClick: () => setMode('minify'), active: mode === 'minify' },
          { label: copyLabel, onClick: handleCopy, disabled: state.status !== 'valid' },
        ]}
      >
        <div className={styles.panes}>
          <InputPane
            id={INPUT_ID}
            value={input}
            onChange={setInput}
            error={state.status === 'error' ? state.message : null}
            errorId={STATUS_ID}
          />
          <OutputPane
            status={state.status}
            content={output}
            meta={outputMeta}
            hint="Paste or type JSON on the left to see it validated and formatted here."
          />
        </div>

        <StatusBar
          id={STATUS_ID}
          status={state.status}
          message={state.status === 'error' ? state.message : undefined}
          keyCount={state.status === 'valid' ? state.keyCount : undefined}
          depth={state.status === 'valid' ? state.depth : undefined}
        />
      </WorkspaceCard>

      <div className={styles.bottomRow}>
        <BuildNoteCard toolId="json-formatter" />

        <div className={styles.sidebar}>
          <ShortcutsCard shortcuts={shortcuts} />
          <NextToolCard currentToolId="json-formatter" />
        </div>
      </div>
    </div>
  );
}
