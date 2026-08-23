import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('calls onChange as the user types', async () => {
    const onChange = vi.fn();
    render(<TextArea id="test-input" value="" onChange={onChange} isInvalid={false} />);

    await userEvent.type(screen.getByRole('textbox'), 'a');

    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('marks itself invalid and wires aria-describedby when isInvalid is set', () => {
    render(<TextArea id="test-input" value="bad" onChange={vi.fn()} isInvalid describedBy="err-id" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', 'err-id');
  });

  it('is not marked invalid by default', () => {
    render(<TextArea id="test-input" value="" onChange={vi.fn()} isInvalid={false} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
  });

  it('renders the given placeholder', () => {
    render(<TextArea id="test-input" value="" onChange={vi.fn()} isInvalid={false} placeholder="type here" />);

    expect(screen.getByPlaceholderText('type here')).toBeInTheDocument();
  });
});
