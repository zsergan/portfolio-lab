import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { describe, expect, it } from 'vitest';
import { RootLayout } from './RootLayout';

function renderRootLayout() {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<p>page content</p>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe('RootLayout', () => {
  it('renders a nav link for every section', () => {
    renderRootLayout();

    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Experience' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Lab' })).toBeInTheDocument();
  });

  it('renders the routed page content and the footer', () => {
    renderRootLayout();

    expect(screen.getByText('page content')).toBeInTheDocument();
    expect(screen.getAllByText('Zakhar Sergan')).toHaveLength(2);
    expect(screen.getByText(String(new Date().getFullYear()))).toBeInTheDocument();
  });
});
