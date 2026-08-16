import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { SandboxHome } from './SandboxHome';

describe('SandboxHome', () => {
  it('renders every topic section heading', () => {
    render(
      <MemoryRouter>
        <SandboxHome />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'TypeScript' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Hooks' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Accessibility' })).toBeInTheDocument();
  });

  it('renders planned entries as non-interactive, not as links', () => {
    render(
      <MemoryRouter>
        <SandboxHome />
      </MemoryRouter>,
    );

    expect(screen.getByText('Generics')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Generics/ })).not.toBeInTheDocument();
  });
});
