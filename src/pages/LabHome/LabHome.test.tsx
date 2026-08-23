import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { LabHome } from './LabHome';

describe('LabHome', () => {
  it('renders every registered tool title', () => {
    render(
      <MemoryRouter>
        <LabHome />
      </MemoryRouter>,
    );

    expect(screen.getByText('JSON Formatter & Validator')).toBeInTheDocument();
    expect(screen.getByText('Color Contrast Checker')).toBeInTheDocument();
    expect(screen.getByText('Unit Converter')).toBeInTheDocument();
  });

  it('renders planned tools as non-interactive, not as links', () => {
    render(
      <MemoryRouter>
        <LabHome />
      </MemoryRouter>,
    );

    expect(screen.getByText('Color Contrast Checker')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Color Contrast/ })).not.toBeInTheDocument();
  });

  it('renders done tools as real links', () => {
    render(
      <MemoryRouter>
        <LabHome />
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: /JSON Formatter/ })).toBeInTheDocument();
  });
});
