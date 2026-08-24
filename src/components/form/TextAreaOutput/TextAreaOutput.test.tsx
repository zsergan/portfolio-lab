import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TextAreaOutput } from './TextAreaOutput';

describe('TextAreaOutput', () => {
  it('shows the idle hint', () => {
    render(<TextAreaOutput status="idle" content="" hint="Type something" />);

    expect(screen.getByText('Type something')).toBeInTheDocument();
  });

  it('shows the content when valid', () => {
    render(<TextAreaOutput status="valid" content='{"a":1}' hint="hint" />);

    expect(screen.getByTestId('text-area-output')).toHaveTextContent('{"a":1}');
  });

  it('renders the given label', () => {
    render(<TextAreaOutput status="idle" content="" hint="hint" label="Output" />);

    expect(screen.getByText('Output')).toBeInTheDocument();
  });

  it('renders the given actions alongside the label', () => {
    render(<TextAreaOutput status="idle" content="" hint="hint" label="Output" actions={<button>Copy</button>} />);

    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument();
  });
});
