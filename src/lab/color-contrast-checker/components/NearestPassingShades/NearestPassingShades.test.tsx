import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { NearestPassingShades } from './NearestPassingShades';

const SHADES = ['#111111', '#222222', '#333333', '#444444', '#555555'];

describe('NearestPassingShades', () => {
  it('renders one button per shade', () => {
    render(<NearestPassingShades shades={SHADES} onSelect={vi.fn()} />);

    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('calls onSelect with the clicked shade', async () => {
    const onSelect = vi.fn();
    render(<NearestPassingShades shades={SHADES} onSelect={onSelect} />);

    await userEvent.click(screen.getByRole('button', { name: 'Use #333333 as the foreground color' }));

    expect(onSelect).toHaveBeenCalledWith('#333333');
  });
});
