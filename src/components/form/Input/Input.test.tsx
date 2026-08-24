import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  it('calls onChange as the user types', async () => {
    const onChange = vi.fn();
    render(<Input id="test-input" value="" onChange={onChange} />);

    await userEvent.type(screen.getByRole('textbox'), 'a');

    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('marks itself invalid and shows the error, wired via aria-describedby, when error is set', () => {
    render(<Input id="test-input" value="bad" onChange={vi.fn()} error="Something's wrong" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');

    const error = screen.getByRole('status');
    expect(error).toHaveTextContent("Something's wrong");
    expect(input).toHaveAttribute('aria-describedby', error.id);
  });

  it('is not marked invalid by default', () => {
    render(<Input id="test-input" value="" onChange={vi.fn()} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
  });

  it('renders as a number input when type is set', () => {
    render(<Input id="test-input" value="1" onChange={vi.fn()} type="number" />);

    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('renders the given placeholder', () => {
    render(<Input id="test-input" value="" onChange={vi.fn()} placeholder="type here" />);

    expect(screen.getByPlaceholderText('type here')).toBeInTheDocument();
  });

  it('renders a label wired to the input when given', () => {
    render(<Input id="test-input" value="" onChange={vi.fn()} label="Amount" />);

    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
  });
});
