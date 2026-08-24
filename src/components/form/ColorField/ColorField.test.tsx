import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ColorField } from './ColorField';

describe('ColorField', () => {
  it('renders the label, wired to the hex input', () => {
    render(<ColorField id="fg" label="Foreground" value="#000000" onChange={vi.fn()} />);

    expect(screen.getByLabelText('Foreground')).toHaveValue('#000000');
  });

  it('calls onChange once a full, valid hex is typed', async () => {
    const onChange = vi.fn();
    render(<ColorField id="fg" label="Foreground" value="#000000" onChange={onChange} />);

    const hexInput = screen.getByLabelText('Foreground');
    await userEvent.clear(hexInput);
    await userEvent.type(hexInput, '#aa3bff');

    expect(onChange).toHaveBeenCalledWith('#aa3bff');
  });

  it('does not call onChange while the typed hex is incomplete, and shows a described hint', async () => {
    const onChange = vi.fn();
    render(<ColorField id="fg" label="Foreground" value="#000000" onChange={onChange} />);

    const hexInput = screen.getByLabelText('Foreground');
    await userEvent.clear(hexInput);
    await userEvent.type(hexInput, '#aa3');

    expect(onChange).not.toHaveBeenCalled();
    expect(hexInput).toHaveAttribute('aria-invalid', 'true');

    const hint = screen.getByRole('status');
    expect(hint).toHaveTextContent(/6-digit hex color/);
    expect(hexInput).toHaveAttribute('aria-describedby', hint.id);
  });

  it('lowercases the hex before forwarding it, since <input type="color"> only accepts lowercase', async () => {
    const onChange = vi.fn();
    render(<ColorField id="fg" label="Foreground" value="#000000" onChange={onChange} />);

    const hexInput = screen.getByLabelText('Foreground');
    await userEvent.clear(hexInput);
    await userEvent.type(hexInput, '#AA3BFF');

    expect(onChange).toHaveBeenCalledWith('#aa3bff');
  });

  it('updates the hex text when the value prop changes externally (e.g. a swap)', () => {
    const { rerender } = render(<ColorField id="fg" label="Foreground" value="#000000" onChange={vi.fn()} />);

    rerender(<ColorField id="fg" label="Foreground" value="#ffffff" onChange={vi.fn()} />);

    expect(screen.getByLabelText('Foreground')).toHaveValue('#ffffff');
  });

  it('exposes a distinct accessible name for the color swatch picker', () => {
    render(<ColorField id="fg" label="Foreground" value="#000000" onChange={vi.fn()} />);

    expect(screen.getByLabelText('Foreground color picker')).toBeInTheDocument();
  });
});
