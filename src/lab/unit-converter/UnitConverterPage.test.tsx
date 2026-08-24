import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

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

    expect(screen.getByText('1 Kilometers')).toBeInTheDocument();
  });

  it('switches category, resetting to that category\'s defaults', async () => {
    renderPage();

    await userEvent.click(screen.getByRole('button', { name: 'Temperature' }));

    expect(screen.getByText('32 Fahrenheit')).toBeInTheDocument();
  });

  it('swaps the from/to units', async () => {
    renderPage();

    await userEvent.click(screen.getByRole('button', { name: 'Swap' }));

    expect(screen.getByLabelText('From')).toHaveValue('kilometer');
    expect(screen.getByLabelText('To')).toHaveValue('meter');
  });

  it('shows a hint instead of a stale result when the input is empty', async () => {
    renderPage();

    const amount = screen.getByLabelText('Amount');
    await userEvent.clear(amount);

    const hint = screen.getByText('Enter a number to convert.');
    expect(hint).toBeInTheDocument();
    expect(amount).toHaveAttribute('aria-invalid', 'true');
    expect(amount).toHaveAttribute('aria-describedby', hint.id);
  });

  it('rejects non-numeric characters, leaving the field effectively empty', async () => {
    renderPage();

    const amount = screen.getByLabelText('Amount');
    await userEvent.clear(amount);
    await userEvent.type(amount, 'abc');

    // A native <input type="number"> sanitizes non-numeric text away
    // entirely (its .value never becomes 'abc' or anything non-numeric),
    // so this hits the same empty-value path as the test above rather
    // than a distinct NaN branch — this test exists to guard that
    // assumption in case the Input's type ever changes.
    expect(amount).toHaveValue(null);
    expect(screen.getByText('Enter a number to convert.')).toBeInTheDocument();
  });
});
