import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { FilterChips } from './FilterChips';

const OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'done', label: 'Shipped' },
];

describe('FilterChips', () => {
  it('marks the active option as selected', () => {
    render(<FilterChips options={OPTIONS} value="all" onChange={vi.fn()} />);

    expect(screen.getByRole('tab', { name: 'All' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Shipped' })).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange with the clicked option\'s value', async () => {
    const onChange = vi.fn();
    render(<FilterChips options={OPTIONS} value="all" onChange={onChange} />);

    await userEvent.click(screen.getByRole('tab', { name: 'Shipped' }));

    expect(onChange).toHaveBeenCalledWith('done');
  });

  it('renders correctly with a single option', () => {
    render(<FilterChips options={[OPTIONS[0]]} value="all" onChange={vi.fn()} />);

    expect(screen.getAllByRole('tab')).toHaveLength(1);
    expect(screen.getByRole('tab', { name: 'All' })).toHaveAttribute('aria-selected', 'true');
  });
});
