import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders as a decorative, accessibility-hidden block', () => {
    const { container } = render(<Skeleton width={100} height={20} />);
    const element = container.firstElementChild;

    expect(element).toHaveAttribute('aria-hidden', 'true');
    expect(element).toHaveStyle({ width: '100px', height: '20px' });
  });
});
