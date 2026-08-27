import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ArrowUpRightIcon } from './ArrowUpRightIcon';

describe('ArrowUpRightIcon', () => {
  it('renders an svg hidden from assistive tech', () => {
    const { container } = render(<ArrowUpRightIcon />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});
