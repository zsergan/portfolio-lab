import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { Breadcrumbs } from './Breadcrumbs';

describe('Breadcrumbs', () => {
  it('links every item that has a "to", and renders the last one as static text', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs
          items={[
            { label: 'lab', to: '/lab' },
            { label: 'color-contrast-checker' },
          ]}
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'lab' })).toHaveAttribute('href', '/lab');
    expect(screen.getByText('color-contrast-checker')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  it('supports more than two segments', () => {
    render(
      <MemoryRouter>
        <Breadcrumbs
          items={[{ label: 'lab', to: '/lab' }, { label: 'snippets', to: '/lab/snippets' }, { label: 'react-hooks' }]}
        />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'lab' })).toHaveAttribute('href', '/lab');
    expect(screen.getByRole('link', { name: 'snippets' })).toHaveAttribute('href', '/lab/snippets');
    expect(screen.getByText('react-hooks')).toBeInTheDocument();
  });
});
