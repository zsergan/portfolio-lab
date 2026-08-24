import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('calls onChange as the user types', async () => {
    const onChange = vi.fn();
    render(<TextArea id="test-input" value="" onChange={onChange} />);

    await userEvent.type(screen.getByRole('textbox'), 'a');

    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('marks itself invalid and shows the error, wired via aria-describedby, when error is set', () => {
    render(<TextArea id="test-input" value="bad" onChange={vi.fn()} error="Invalid JSON" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');

    const error = screen.getByRole('status');
    expect(error).toHaveTextContent('Invalid JSON');
    expect(textarea).toHaveAttribute('aria-describedby', error.id);
  });

  it('is not marked invalid by default', () => {
    render(<TextArea id="test-input" value="" onChange={vi.fn()} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
  });

  it('renders the given placeholder', () => {
    render(<TextArea id="test-input" value="" onChange={vi.fn()} placeholder="type here" />);

    expect(screen.getByPlaceholderText('type here')).toBeInTheDocument();
  });

  it('renders a label wired to the textarea when given', () => {
    render(<TextArea id="test-input" value="" onChange={vi.fn()} label="Input" />);

    expect(screen.getByLabelText('Input')).toBeInTheDocument();
  });
});
