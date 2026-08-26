import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Eyebrow } from './Eyebrow';

describe('Eyebrow', () => {
  it('renders its children prefixed with //', () => {
    render(<Eyebrow>about</Eyebrow>);

    expect(screen.getByText('// about')).toBeInTheDocument();
  });

  it('merges an extra className onto its own', () => {
    render(<Eyebrow className="custom">about</Eyebrow>);

    expect(screen.getByText('// about')).toHaveClass('custom');
  });

  it('applies a different class for the muted variant than the default accent one', () => {
    const { rerender } = render(<Eyebrow>about</Eyebrow>);
    const accentClassName = screen.getByText('// about').className;

    rerender(<Eyebrow variant="muted">about</Eyebrow>);
    const mutedClassName = screen.getByText('// about').className;

    expect(mutedClassName).not.toBe(accentClassName);
  });
});
