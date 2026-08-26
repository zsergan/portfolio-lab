import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Card } from './Card';

describe('Card', () => {
  it('renders its children', () => {
    render(
      <Card>
        <p>Body content</p>
      </Card>,
    );

    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('merges an extra className onto its own', () => {
    render(
      <Card className="custom">
        <p>Body content</p>
      </Card>,
    );

    expect(screen.getByText('Body content').parentElement).toHaveClass('custom');
  });
});
