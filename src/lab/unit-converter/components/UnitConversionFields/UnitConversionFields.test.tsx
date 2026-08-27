import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { UnitConversionFields } from './UnitConversionFields';

const UNIT_OPTIONS = [
  { value: 'meter', label: 'Meters' },
  { value: 'kilometer', label: 'Kilometers' },
];

describe('UnitConversionFields', () => {
  it('renders an editable From field and a read-only To field', () => {
    render(
      <UnitConversionFields
        from="meter"
        to="kilometer"
        unitOptions={UNIT_OPTIONS}
        value="1000"
        result="1"
        error={null}
        onValueChange={vi.fn()}
        onFromChange={vi.fn()}
        onToChange={vi.fn()}
        onSwap={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('From')).toHaveValue('1000');
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByLabelText('From unit')).toHaveValue('meter');
    expect(screen.getByLabelText('To unit')).toHaveValue('kilometer');
  });

  it('calls onSwap when the swap button is clicked', async () => {
    const onSwap = vi.fn();
    render(
      <UnitConversionFields
        from="meter"
        to="kilometer"
        unitOptions={UNIT_OPTIONS}
        value="1000"
        result="1"
        error={null}
        onValueChange={vi.fn()}
        onFromChange={vi.fn()}
        onToChange={vi.fn()}
        onSwap={onSwap}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Swap units' }));
    expect(onSwap).toHaveBeenCalled();
  });
});
