import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { CategoryTabs } from './CategoryTabs';

const OPTIONS = [
  { value: 'length', label: 'Length' },
  { value: 'weight', label: 'Weight' },
];

describe('CategoryTabs', () => {
  it('marks the active option as selected', () => {
    render(<CategoryTabs options={OPTIONS} value="length" onChange={vi.fn()} />);

    expect(screen.getByRole('tab', { name: 'Length' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Weight' })).toHaveAttribute('aria-selected', 'false');
  });

  it('calls onChange with the clicked option\'s value', async () => {
    const onChange = vi.fn();
    render(<CategoryTabs options={OPTIONS} value="length" onChange={onChange} />);

    await userEvent.click(screen.getByRole('tab', { name: 'Weight' }));

    expect(onChange).toHaveBeenCalledWith('weight');
  });
});
