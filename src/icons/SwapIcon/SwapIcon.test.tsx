import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { SwapIcon } from './SwapIcon';

describe('SwapIcon', () => {
  it('renders an svg hidden from assistive tech', () => {
    const { container } = render(<SwapIcon />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});
