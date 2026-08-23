import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TextAreaOutput } from './TextAreaOutput';

describe('TextAreaOutput', () => {
  it('shows the idle hint', () => {
    render(<TextAreaOutput status="idle" content="" hint="Type something" errorMessage={null} errorId="err" />);

    expect(screen.getByText('Type something')).toBeInTheDocument();
  });

  it('shows the content when valid', () => {
    render(
      <TextAreaOutput status="valid" content='{"a":1}' hint="hint" errorMessage={null} errorId="err" />,
    );

    expect(screen.getByTestId('text-area-output')).toHaveTextContent('{"a":1}');
  });

  it('announces the error message via a live region', () => {
    render(<TextAreaOutput status="error" content="" hint="hint" errorMessage="bad input" errorId="err" />);

    expect(screen.getByRole('status')).toHaveTextContent('bad input');
  });

  it('renders an empty, but present, status region when not in an error state', () => {
    render(<TextAreaOutput status="idle" content="" hint="hint" errorMessage={null} errorId="err" />);

    expect(screen.getByRole('status')).toHaveTextContent('');
  });
});
