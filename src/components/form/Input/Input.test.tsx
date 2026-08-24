import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  it('calls onChange as the user types', async () => {
    const onChange = vi.fn();
    render(<Input id="test-input" value="" onChange={onChange} isInvalid={false} />);

    await userEvent.type(screen.getByRole('textbox'), 'a');

    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('marks itself invalid and wires aria-describedby when isInvalid is set', () => {
    render(<Input id="test-input" value="bad" onChange={vi.fn()} isInvalid describedBy="err-id" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'err-id');
  });

  it('is not marked invalid by default', () => {
    render(<Input id="test-input" value="" onChange={vi.fn()} isInvalid={false} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
  });

  it('renders as a number input when type is set', () => {
    render(<Input id="test-input" value="1" onChange={vi.fn()} isInvalid={false} type="number" />);

    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
  });

  it('renders the given placeholder', () => {
    render(<Input id="test-input" value="" onChange={vi.fn()} isInvalid={false} placeholder="type here" />);

    expect(screen.getByPlaceholderText('type here')).toBeInTheDocument();
  });
});
