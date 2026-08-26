import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ColorContrastCheckerPage } from './ColorContrastCheckerPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <ColorContrastCheckerPage />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
  });
});

describe('ColorContrastCheckerPage', () => {
  it('shows 9.97:1 and passes every WCAG check for the default color pair', () => {
    renderPage();

    expect(screen.getByText('9.97')).toBeInTheDocument();
    expect(screen.getAllByText('pass')).toHaveLength(4);
  });

  it('fails every WCAG check for a low-contrast pair', async () => {
    renderPage();

    const foreground = screen.getByLabelText('Foreground');
    await userEvent.clear(foreground);
    await userEvent.type(foreground, '#777777');

    const background = screen.getByLabelText('Background');
    await userEvent.clear(background);
    await userEvent.type(background, '#888888');

    expect(screen.getAllByText('fail')).toHaveLength(4);
  });

  it('swaps foreground and background via the header action', async () => {
    renderPage();

    const foreground = screen.getByLabelText('Foreground');
    await userEvent.clear(foreground);
    await userEvent.type(foreground, '#111111');

    await userEvent.click(screen.getByRole('button', { name: 'Swap' }));

    expect(screen.getByLabelText('Foreground')).toHaveValue('#f2eee4');
    expect(screen.getByLabelText('Background')).toHaveValue('#111111');
  });

  it('swaps foreground and background via the inline icon button', async () => {
    renderPage();

    const foreground = screen.getByLabelText('Foreground');
    await userEvent.clear(foreground);
    await userEvent.type(foreground, '#222222');

    await userEvent.click(screen.getByRole('button', { name: 'Swap colors' }));

    expect(screen.getByLabelText('Foreground')).toHaveValue('#f2eee4');
    expect(screen.getByLabelText('Background')).toHaveValue('#222222');
  });

  it('copies the color pair to the clipboard', async () => {
    renderPage();

    await userEvent.click(screen.getByRole('button', { name: 'Copy pair' }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('#3d2f6b / #f2eee4');
    expect(await screen.findByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });
});
