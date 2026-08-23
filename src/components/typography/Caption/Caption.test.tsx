import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Caption } from './Caption';

describe('Caption', () => {
  it('renders as a span by default', () => {
    render(<Caption>Output</Caption>);

    const caption = screen.getByText('Output');
    expect(caption.tagName).toBe('SPAN');
  });

  it('renders as a label wired to htmlFor when given', () => {
    render(<Caption htmlFor="the-input">Input</Caption>);

    expect(screen.getByText('Input').tagName).toBe('LABEL');
    expect(screen.getByText('Input')).toHaveAttribute('for', 'the-input');
  });

  it('merges an extra className onto its own', () => {
    render(<Caption className="badge">planned</Caption>);

    expect(screen.getByText('planned')).toHaveClass('badge');
  });
});
