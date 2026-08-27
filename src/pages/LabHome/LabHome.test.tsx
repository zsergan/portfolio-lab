import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { LabHome } from './LabHome';

function renderPage() {
  return render(
    <MemoryRouter>
      <LabHome />
    </MemoryRouter>,
  );
}

describe('LabHome', () => {
  it('renders every registered tool title', () => {
    renderPage();

    expect(screen.getByText('JSON Formatter & Validator')).toBeInTheDocument();
    expect(screen.getByText('Color Contrast Checker')).toBeInTheDocument();
    expect(screen.getByText('Unit Converter')).toBeInTheDocument();
  });

  it('renders planned tools as non-interactive, not as links', () => {
    renderPage();

    expect(screen.getByText('Form Builder Playground')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /Form Builder Playground/ })).not.toBeInTheDocument();
  });

  it('renders done tools as real links', () => {
    renderPage();

    expect(screen.getByRole('link', { name: /JSON Formatter/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Color Contrast Checker/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Unit Converter/ })).toBeInTheDocument();
  });

  it('filters to only shipped tools', async () => {
    renderPage();

    await userEvent.click(screen.getByRole('tab', { name: 'Shipped' }));

    expect(screen.getByText('JSON Formatter & Validator')).toBeInTheDocument();
    expect(screen.queryByText('Form Builder Playground')).not.toBeInTheDocument();
  });

  it('filters to only planned tools', async () => {
    renderPage();

    await userEvent.click(screen.getByRole('tab', { name: 'Planned' }));

    expect(screen.getByText('Form Builder Playground')).toBeInTheDocument();
    expect(screen.queryByText('JSON Formatter & Validator')).not.toBeInTheDocument();
  });

  it('returns to showing every tool when All is selected again', async () => {
    renderPage();

    await userEvent.click(screen.getByRole('tab', { name: 'Planned' }));
    await userEvent.click(screen.getByRole('tab', { name: 'All' }));

    expect(screen.getByText('JSON Formatter & Validator')).toBeInTheDocument();
    expect(screen.getByText('Form Builder Playground')).toBeInTheDocument();
  });

  it('shows the shipped count out of the total tool count', () => {
    renderPage();

    expect(screen.getByText('3 / 10 shipped')).toBeInTheDocument();
  });
});
