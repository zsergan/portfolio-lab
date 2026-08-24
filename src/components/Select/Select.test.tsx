import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './Select';

const OPTIONS = [
  { value: 'meter', label: 'Meters' },
  { value: 'kilometer', label: 'Kilometers' },
];

describe('Select', () => {
  it('renders an option for each entry', () => {
    render(<Select id="test-select" value="meter" onChange={vi.fn()} options={OPTIONS} />);

    expect(screen.getByRole('option', { name: 'Meters' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Kilometers' })).toBeInTheDocument();
  });

  it('calls onChange with the selected value', async () => {
    const onChange = vi.fn();
    render(<Select id="test-select" value="meter" onChange={onChange} options={OPTIONS} />);

    await userEvent.selectOptions(screen.getByRole('combobox'), 'kilometer');

    expect(onChange).toHaveBeenCalledWith('kilometer');
  });

  it('reflects the given value', () => {
    render(<Select id="test-select" value="kilometer" onChange={vi.fn()} options={OPTIONS} />);

    expect(screen.getByRole('combobox')).toHaveValue('kilometer');
  });
});
