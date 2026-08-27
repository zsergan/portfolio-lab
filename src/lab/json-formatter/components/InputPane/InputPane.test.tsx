import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { InputPane } from './InputPane';

describe('InputPane', () => {
  it('shows a 1-line, 0 B meta for empty input', () => {
    render(<InputPane id="in" value="" onChange={vi.fn()} errorId="err" />);

    expect(screen.getByText('1 line · 0 B')).toBeInTheDocument();
  });

  it('counts lines and bytes for multi-line input', () => {
    render(<InputPane id="in" value={'{\n  "a": 1\n}'} onChange={vi.fn()} errorId="err" />);

    expect(screen.getByText('3 lines · 12 B')).toBeInTheDocument();
  });

  it('renders one gutter line number per line', () => {
    const { container } = render(<InputPane id="in" value={'a\nb\nc'} onChange={vi.fn()} errorId="err" />);

    const gutter = container.querySelector('[aria-hidden="true"]');
    expect(gutter?.textContent).toBe('123');
  });

  it('calls onChange as the user types', async () => {
    const onChange = vi.fn();
    render(<InputPane id="in" value="" onChange={onChange} errorId="err" />);

    await userEvent.type(screen.getByRole('textbox'), 'x');

    expect(onChange).toHaveBeenCalledWith('x');
  });

  it('marks itself invalid and links to the error message when given one', () => {
    render(<InputPane id="in" value="{bad" onChange={vi.fn()} error="Unexpected token" errorId="err" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(textarea).toHaveAttribute('aria-describedby', 'err');
  });
});
