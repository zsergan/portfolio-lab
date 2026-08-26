import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ContrastRatioDisplay } from './ContrastRatioDisplay';

describe('ContrastRatioDisplay', () => {
  it('formats the ratio to 2 decimal places with a ": 1" suffix', () => {
    render(<ContrastRatioDisplay ratio={9.97} />);

    expect(screen.getByText('9.97')).toBeInTheDocument();
    expect(screen.getByText(': 1')).toBeInTheDocument();
  });

  it('hides the scale bar from the accessibility tree, since it only restates the ratio and grid as a visual', () => {
    const { container } = render(<ContrastRatioDisplay ratio={9.97} />);

    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
