import { fireEvent, render, screen } from '@testing-library/react';
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
  it('shows a hint and a waiting status when the input is empty', () => {
    renderPage();

    expect(screen.getByText(/Paste or type JSON/)).toBeInTheDocument();
    expect(screen.getByText('Waiting for input')).toBeInTheDocument();
  });

  it('pretty-prints valid JSON as you type, with no extra clicks', async () => {
    renderPage();

    await userEvent.type(screen.getByLabelText('INPUT'), '{{"a":1}');

    expect(screen.getByTestId('json-output')).toHaveTextContent('{ "a": 1 }');
  });

  it('shows an invalid status linked to the input, with the parse error announced', async () => {
    renderPage();

    const textarea = screen.getByLabelText('INPUT');
    await userEvent.type(textarea, '{{invalid');

    const status = screen.getByRole('status');
    expect(status).toHaveTextContent('invalid JSON');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', status.id);
  });

  it('reports real key count and depth for valid JSON', async () => {
    renderPage();

    await userEvent.type(screen.getByLabelText('INPUT'), '{{"a":{{"b":1}}');

    const status = screen.getByRole('status');
    expect(status).toHaveTextContent('2 keys · depth 2');
  });

  it('switches between pretty and minified output via the toolbar, reflected in aria-pressed', async () => {
    renderPage();

    await userEvent.type(screen.getByLabelText('INPUT'), '{{"a":1}');
    expect(screen.getByTestId('json-output')).toHaveTextContent('{ "a": 1 }');
    expect(screen.getByRole('button', { name: 'Pretty' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Minify' })).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(screen.getByRole('button', { name: 'Minify' }));
    expect(screen.getByTestId('json-output')).toHaveTextContent('{"a":1}');
    expect(screen.getByRole('button', { name: 'Pretty' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('button', { name: 'Minify' })).toHaveAttribute('aria-pressed', 'true');

    await userEvent.click(screen.getByRole('button', { name: 'Pretty' }));
    expect(screen.getByTestId('json-output')).toHaveTextContent('{ "a": 1 }');
  });

  it('copies the current output to the clipboard, disabled until the input is valid', async () => {
    renderPage();

    expect(screen.getByRole('button', { name: 'Copy' })).toBeDisabled();

    await userEvent.type(screen.getByLabelText('INPUT'), '{{"a":1}');
    await userEvent.click(screen.getByRole('button', { name: 'Copy' }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('{\n  "a": 1\n}');
    expect(await screen.findByRole('button', { name: 'Copied' })).toBeInTheDocument();
  });

  it('clears both panes via the Clear panes shortcut (mod+backspace)', async () => {
    renderPage();

    await userEvent.type(screen.getByLabelText('INPUT'), '{{"a":1}');
    expect(screen.getByLabelText('INPUT')).toHaveValue('{"a":1}');

    fireEvent.keyDown(document, { key: 'Backspace', metaKey: true });

    expect(screen.getByLabelText('INPUT')).toHaveValue('');
    expect(screen.getByText(/Paste or type JSON/)).toBeInTheDocument();
  });

  it('resets the mode back to Pretty when clearing, even after switching to Minify', async () => {
    renderPage();

    await userEvent.type(screen.getByLabelText('INPUT'), '{{"a":1}');
    await userEvent.click(screen.getByRole('button', { name: 'Minify' }));

    fireEvent.keyDown(document, { key: 'Backspace', metaKey: true });
    await userEvent.type(screen.getByLabelText('INPUT'), '{{"a":1}');

    expect(screen.getByTestId('json-output')).toHaveTextContent('{ "a": 1 }');
    expect(screen.getByRole('button', { name: 'Pretty' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('toggles pretty/minify via the Toggle format shortcut (mod+enter)', async () => {
    renderPage();

    await userEvent.type(screen.getByLabelText('INPUT'), '{{"a":1}');
    expect(screen.getByTestId('json-output')).toHaveTextContent('{ "a": 1 }');

    fireEvent.keyDown(document, { key: 'Enter', metaKey: true });

    expect(screen.getByTestId('json-output')).toHaveTextContent('{"a":1}');
  });
});
