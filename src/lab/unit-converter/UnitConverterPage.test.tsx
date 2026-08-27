import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

import { UnitConverterPage } from './UnitConverterPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <UnitConverterPage />
    </MemoryRouter>,
  );
}

describe('UnitConverterPage', () => {
  it('converts 1000 meters to 1 kilometer by default', () => {
    renderPage();

    expect(screen.getByLabelText('From')).toHaveValue('1000');
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('switches category, resetting to that category\'s defaults', async () => {
    renderPage();

    await userEvent.click(screen.getByRole('tab', { name: 'Temperature' }));

    expect(screen.getByLabelText('From')).toHaveValue('0');
    expect(screen.getByText('32')).toBeInTheDocument();
  });

  it('switches to the new Data category, converting 1 megabyte to mebibytes', async () => {
    renderPage();

    await userEvent.click(screen.getByRole('tab', { name: 'Data' }));

    expect(screen.getByLabelText('From')).toHaveValue('1');
    expect(screen.getByLabelText('From unit')).toHaveValue('megabyte');
    expect(screen.getByLabelText('To unit')).toHaveValue('mebibyte');
    expect(screen.getByText('0.9537')).toBeInTheDocument();
  });

  it('swaps the from/to units without changing the typed value', async () => {
    renderPage();

    await userEvent.click(screen.getByRole('button', { name: 'Swap' }));

    expect(screen.getByLabelText('From unit')).toHaveValue('kilometer');
    expect(screen.getByLabelText('To unit')).toHaveValue('meter');
    expect(screen.getByLabelText('From')).toHaveValue('1000');
  });

  it('shows an error and a dash result when the From field is cleared', async () => {
    renderPage();

    const from = screen.getByLabelText('From');
    await userEvent.clear(from);

    expect(screen.getByText('Enter a number to convert.')).toBeInTheDocument();
    expect(from).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('rejects non-numeric characters typed into From', async () => {
    renderPage();

    const from = screen.getByLabelText('From');
    await userEvent.clear(from);
    await userEvent.type(from, 'abc');

    expect(screen.getByText('Enter a number to convert.')).toBeInTheDocument();
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('resets to the category defaults when Reset is clicked', async () => {
    renderPage();

    const from = screen.getByLabelText('From');
    await userEvent.clear(from);
    await userEvent.type(from, '42');
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }));

    expect(from).toHaveValue('1000');
  });

  it('copies the result and unit label, cycling the button label', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });

    renderPage();

    await userEvent.click(screen.getByRole('button', { name: 'Copy' }));

    expect(writeText).toHaveBeenCalledWith('1 Kilometers');
    expect(await screen.findByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });
});
