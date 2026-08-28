import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AvailabilityBadge } from './AvailabilityBadge';

describe('AvailabilityBadge', () => {
  it('renders the given text', () => {
    render(<AvailabilityBadge text="open to senior / staff front-end roles" />);

    expect(screen.getByText('open to senior / staff front-end roles')).toBeInTheDocument();
  });
});
