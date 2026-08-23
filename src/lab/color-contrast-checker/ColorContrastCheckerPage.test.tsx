import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { ColorContrastCheckerPage } from './ColorContrastCheckerPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <ColorContrastCheckerPage />
    </MemoryRouter>,
  );
}

describe('ColorContrastCheckerPage', () => {
  it('shows 21:1 and passes both AA and AAA for the default black-on-white pair', () => {
    renderPage();

    expect(screen.getByText('21.00:1')).toBeInTheDocument();
    expect(screen.getAllByText('Pass')).toHaveLength(2);
  });

  it('fails both AA and AAA for a low-contrast pair', async () => {
    renderPage();

    const foreground = screen.getByLabelText('Foreground');
    await userEvent.clear(foreground);
    await userEvent.type(foreground, '#777777');

    const background = screen.getByLabelText('Background');
    await userEvent.clear(background);
    await userEvent.type(background, '#888888');

    expect(screen.getAllByText('Fail')).toHaveLength(2);
  });

  it('swaps foreground and background', async () => {
    renderPage();

    const foreground = screen.getByLabelText('Foreground');
    await userEvent.clear(foreground);
    await userEvent.type(foreground, '#111111');

    await userEvent.click(screen.getByRole('button', { name: 'Swap' }));

    expect(screen.getByLabelText('Foreground')).toHaveValue('#ffffff');
    expect(screen.getByLabelText('Background')).toHaveValue('#111111');
  });
});
