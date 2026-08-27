import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ConversionField } from './ConversionField';

const UNIT_OPTIONS = [
  { value: 'meter', label: 'Meters' },
  { value: 'kilometer', label: 'Kilometers' },
];

describe('ConversionField', () => {
  it('renders an editable input for the input variant', async () => {
    const onValueChange = vi.fn();
    render(
      <ConversionField
        variant="input"
        id="from"
        label="From"
        value="1000"
        onValueChange={onValueChange}
        unit="meter"
        unitOptions={UNIT_OPTIONS}
        onUnitChange={vi.fn()}
        unitAriaLabel="From unit"
      />,
    );

    const input = screen.getByLabelText('From');
    expect(input).toHaveValue('1000');

    await userEvent.type(input, '5');
    expect(onValueChange).toHaveBeenCalled();
  });

  it('shows the error message and marks the input invalid', () => {
    render(
      <ConversionField
        variant="input"
        id="from"
        label="From"
        value=""
        onValueChange={vi.fn()}
        error="Enter a number to convert."
        unit="meter"
        unitOptions={UNIT_OPTIONS}
        onUnitChange={vi.fn()}
        unitAriaLabel="From unit"
      />,
    );

    const input = screen.getByLabelText('From');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Enter a number to convert.')).toBeInTheDocument();
  });

  it('renders a read-only value for the output variant, with no textbox', () => {
    render(
      <ConversionField
        variant="output"
        id="to"
        label="To"
        value="1"
        unit="kilometer"
        unitOptions={UNIT_OPTIONS}
        onUnitChange={vi.fn()}
        unitAriaLabel="To unit"
      />,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('calls onUnitChange when the unit select changes', async () => {
    const onUnitChange = vi.fn();
    render(
      <ConversionField
        variant="output"
        id="to"
        label="To"
        value="1"
        unit="meter"
        unitOptions={UNIT_OPTIONS}
        onUnitChange={onUnitChange}
        unitAriaLabel="To unit"
      />,
    );

    await userEvent.selectOptions(screen.getByLabelText('To unit'), 'kilometer');
    expect(onUnitChange).toHaveBeenCalledWith('kilometer');
  });
});
