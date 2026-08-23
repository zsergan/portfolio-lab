import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { BackLink } from './BackLink';

describe('BackLink', () => {
  it('renders a link with a leading arrow, pointing at the given destination', () => {
    render(
      <MemoryRouter>
        <BackLink to="/lab">Back to Lab</BackLink>
      </MemoryRouter>,
    );

    const link = screen.getByRole('link', { name: 'Back to Lab' });
    expect(link).toHaveAttribute('href', '/lab');
  });

  it('hides the decorative arrow from the accessible name', () => {
    render(
      <MemoryRouter>
        <BackLink to="/lab">Back to Lab</BackLink>
      </MemoryRouter>,
    );

    expect(screen.getByRole('link')).toHaveTextContent('← Back to Lab');
  });
});
