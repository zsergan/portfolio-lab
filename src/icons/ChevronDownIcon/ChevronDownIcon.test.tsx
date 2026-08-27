import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ChevronDownIcon } from './ChevronDownIcon';

describe('ChevronDownIcon', () => {
  it('renders an svg hidden from assistive tech', () => {
    const { container } = render(<ChevronDownIcon />);
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});
