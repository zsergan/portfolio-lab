import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { OutputPane } from './OutputPane';

describe('OutputPane', () => {
  it('shows the hint and a placeholder meta when idle', () => {
    render(<OutputPane status="idle" content="" meta="pretty · 2 spaces" hint="Paste JSON to see output." />);

    expect(screen.getByText('Paste JSON to see output.')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('shows the formatted content and meta when valid', () => {
    render(<OutputPane status="valid" content={'{\n  "a": 1\n}'} meta="pretty · 2 spaces" hint="" />);

    expect(screen.getByTestId('json-output')).toHaveTextContent('{ "a": 1 }');
    expect(screen.getByText('pretty · 2 spaces')).toBeInTheDocument();
  });

  it('shows neither content nor the hint when the input is invalid', () => {
    render(<OutputPane status="error" content="" meta="pretty · 2 spaces" hint="Paste JSON to see output." />);

    expect(screen.queryByTestId('json-output')).not.toBeInTheDocument();
    expect(screen.queryByText('Paste JSON to see output.')).not.toBeInTheDocument();
  });
});
