import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { describe, expect, it } from 'vitest';

import { RouteError } from './RouteError';

function ThrowingComponent(): never {
  throw new Error('boom');
}

describe('RouteError', () => {
  it('renders the thrown error message and a link home', async () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <ThrowingComponent />,
          errorElement: <RouteError />,
        },
      ],
      { initialEntries: ['/'] },
    );

    render(<RouterProvider router={router} />);

    expect(await screen.findByRole('heading', { name: 'Something went wrong' })).toBeInTheDocument();
    expect(screen.getByText('boom')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back home' })).toHaveAttribute('href', '/');
  });
});
