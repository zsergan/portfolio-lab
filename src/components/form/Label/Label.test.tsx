import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Label } from './Label';

describe('Label', () => {
  it('renders as a span by default', () => {
    render(<Label>Output</Label>);

    const label = screen.getByText('Output');
    expect(label.tagName).toBe('SPAN');
  });

  it('renders as a label wired to htmlFor when given', () => {
    render(<Label htmlFor="the-input">Input</Label>);

    expect(screen.getByText('Input').tagName).toBe('LABEL');
    expect(screen.getByText('Input')).toHaveAttribute('for', 'the-input');
  });

  it('merges an extra className onto its own', () => {
    render(<Label className="badge">planned</Label>);

    expect(screen.getByText('planned')).toHaveClass('badge');
  });
});
