import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Toggle } from './Toggle';

const options = [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
];

describe('Toggle', () => {
  it('marks the active option as pressed and the rest as not pressed', () => {
    render(<Toggle options={options} value="a" onChange={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'A' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'B' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onChange with the clicked option value', async () => {
    const onChange = vi.fn();
    render(<Toggle options={options} value="a" onChange={onChange} />);

    await userEvent.click(screen.getByRole('button', { name: 'B' }));

    expect(onChange).toHaveBeenCalledWith('b');
  });
});
