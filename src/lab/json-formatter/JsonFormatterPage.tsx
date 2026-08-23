import { useState } from 'react';

import { useJsonFormat } from './hooks/useJsonFormat';
import { BackLink, Button, Caption, Description, TextArea, TextAreaOutput, Toggle } from '@/components';
import { useCopyToClipboard } from '@/hooks';

import styles from './JsonFormatterPage.module.css';

type Mode = 'pretty' | 'minify';

const INPUT_ID = 'json-formatter-input';
const ERROR_ID = 'json-formatter-error';

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
      <BackLink to="/lab">Back to Lab</BackLink>

      <h2>JSON Formatter &amp; Validator</h2>
      <Description>Pretty-print, minify, and validate JSON with inline error feedback.</Description>

      <div className={styles.workspace}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <Caption htmlFor={INPUT_ID}>Input</Caption>
          </div>
          <TextArea
            id={INPUT_ID}
            value={input}
            onChange={setInput}
            isInvalid={state.status === 'error'}
            placeholder='{"hello": "world"}'
            describedBy={state.status === 'error' ? ERROR_ID : undefined}
          />
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <Caption>Output</Caption>

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
                <Button onClick={() => copy(output)} disabled={state.status !== 'valid'}>
                  {copyStatus === 'copied' ? 'Copied' : copyStatus === 'error' ? 'Copy failed' : 'Copy'}
                </Button>
              </span>

              <Button onClick={handleClear}>Clear</Button>
            </div>
          </div>

          <TextAreaOutput
            status={state.status}
            content={output}
            hint="Paste or type JSON on the left to see it validated and formatted here."
            errorMessage={state.status === 'error' ? state.message : null}
            errorId={ERROR_ID}
          />
        </div>
      </div>
    </div>
  );
}
