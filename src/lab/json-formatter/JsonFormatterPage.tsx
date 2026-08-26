import { useState } from 'react';

import { useJsonFormat } from './hooks/useJsonFormat';
import { Breadcrumbs, Button, TextArea, TextAreaOutput, Toggle, ToolIntro } from '@/components';
import { useCopyToClipboard } from '@/hooks';

import styles from './JsonFormatterPage.module.css';

type Mode = 'pretty' | 'minify';

const INPUT_ID = 'json-formatter-input';

export function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<Mode>('pretty');

  const state = useJsonFormat(input);
  const output = state.status === 'valid' ? (mode === 'pretty' ? state.pretty : state.minified) : '';
  const { status: copyStatus, copy } = useCopyToClipboard();

  function handleClear() {
    setInput('');
    setMode('pretty');
  }

  return (
    <div>
      <Breadcrumbs items={[{ label: 'lab', to: '/lab' }, { label: 'json-formatter' }]} />
      <ToolIntro toolId="json-formatter" />

      <div className={styles.workspace}>
        <TextArea
          id={INPUT_ID}
          label="Input"
          labelClassName={styles.inputLabel}
          value={input}
          onChange={setInput}
          error={state.status === 'error' ? state.message : null}
          placeholder='{"hello": "world"}'
        />

        <TextAreaOutput
          label="Output"
          headerClassName={styles.outputHeader}
          status={state.status}
          content={output}
          hint="Paste or type JSON on the left to see it validated and formatted here."
          actions={
            <div className={styles.toolbar}>
              <Toggle
                options={[
                  { value: 'pretty', label: 'Pretty' },
                  { value: 'minify', label: 'Minify' },
                ]}
                value={mode}
                onChange={setMode}
              />

              <span role="status" aria-label="Copy status">
                <Button
                  onClick={() => copy(output)}
                  disabled={state.status !== 'valid'}
                  className={styles.copyButton}
                >
                  {copyStatus === 'copied' ? 'Copied' : copyStatus === 'error' ? 'Copy failed' : 'Copy'}
                </Button>
              </span>

              <Button onClick={handleClear}>Clear</Button>
            </div>
          }
        />
      </div>
    </div>
  );
}
