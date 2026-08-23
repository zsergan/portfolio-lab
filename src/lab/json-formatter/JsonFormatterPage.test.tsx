import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { JsonFormatterPage } from './JsonFormatterPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <JsonFormatterPage />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
  });
});

describe('JsonFormatterPage', () => {
  it('shows a hint when the input is empty', () => {
    renderPage();

    expect(screen.getByText(/Paste or type JSON/)).toBeInTheDocument();
  });

  it('pretty-prints valid JSON as you type, with no extra clicks', async () => {
    renderPage();

    await userEvent.type(screen.getByLabelText('Input'), '{{"a":1}');

    expect(screen.getByTestId('text-area-output').textContent).toBe('{\n  "a": 1\n}');
  });

  it('shows an inline error for invalid JSON, announced via a live region', async () => {
    renderPage();

    const textarea = screen.getByLabelText('Input');
    await userEvent.type(textarea, '{{invalid');

    const status = await screen.findByRole('status');
    expect(status.textContent).not.toBe('');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', status.id);
  });

  it('switches between pretty and minified output, reflected via aria-pressed', async () => {
    renderPage();

    await userEvent.type(screen.getByLabelText('Input'), '{{"a":1}');

    const prettyButton = screen.getByRole('button', { name: 'Pretty' });
    const minifyButton = screen.getByRole('button', { name: 'Minify' });
    expect(prettyButton).toHaveAttribute('aria-pressed', 'true');
    expect(minifyButton).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(minifyButton);

    expect(screen.getByTestId('text-area-output').textContent).toBe('{"a":1}');
    expect(prettyButton).toHaveAttribute('aria-pressed', 'false');
    expect(minifyButton).toHaveAttribute('aria-pressed', 'true');

    await userEvent.click(prettyButton);

    expect(screen.getByTestId('text-area-output').textContent).toBe('{\n  "a": 1\n}');
  });

  it('copies the current output to the clipboard', async () => {
    renderPage();

    await userEvent.type(screen.getByLabelText('Input'), '{{"a":1}');
    await userEvent.click(screen.getByRole('button', { name: 'Copy' }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('{\n  "a": 1\n}');
    expect(await screen.findByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });

  it('shows a failure state and does not crash when the clipboard write fails', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
      configurable: true,
    });
    renderPage();

    await userEvent.type(screen.getByLabelText('Input'), '{{"a":1}');
    await userEvent.click(screen.getByRole('button', { name: 'Copy' }));

    expect(await screen.findByRole('button', { name: 'Copy failed' })).toBeInTheDocument();
  });

  it('clears the input back to the idle state', async () => {
    renderPage();

    await userEvent.type(screen.getByLabelText('Input'), '{{"a":1}');
    await userEvent.click(screen.getByRole('button', { name: 'Clear' }));

    expect(screen.getByLabelText('Input')).toHaveValue('');
    expect(screen.getByText(/Paste or type JSON/)).toBeInTheDocument();
  });
});
