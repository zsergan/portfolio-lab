import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs', () => {
  it('links "lab" to the Lab index', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs slug="color-contrast-checker" />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'lab' })).toHaveAttribute('href', '/lab');
  });

  it('renders the given slug as static text, not a link', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs slug="color-contrast-checker" />
      </MemoryRouter>,
    );

    expect(screen.getByText('color-contrast-checker')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });
});
