import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ProgressStrip } from './ProgressStrip';

describe('ProgressStrip', () => {
  it('renders one cell per total, labeled with the done count', () => {
    const { container } = render(<ProgressStrip done={3} total={10} />);

    const strip = screen.getByRole('progressbar', { name: '3 of 10 tools shipped' });
    expect(strip).toHaveAttribute('aria-valuenow', '3');
    expect(strip).toHaveAttribute('aria-valuemin', '0');
    expect(strip).toHaveAttribute('aria-valuemax', '10');
    expect(container.querySelectorAll('span')).toHaveLength(10);
  });

  it('renders no filled cells when nothing is done', () => {
    const { container } = render(<ProgressStrip done={0} total={10} />);

    expect(container.querySelectorAll('span[class*="cellFilled"]')).toHaveLength(0);
  });

  it('fills every cell when done equals total', () => {
    const { container } = render(<ProgressStrip done={10} total={10} />);

    expect(container.querySelectorAll('span[class*="cellFilled"]')).toHaveLength(10);
  });
});
