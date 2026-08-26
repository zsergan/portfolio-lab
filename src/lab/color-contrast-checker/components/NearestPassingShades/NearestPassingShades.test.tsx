import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { NearestPassingShades } from './NearestPassingShades';

const SHADES = ['#111111', '#222222', '#333333', '#444444', '#555555'];

describe('NearestPassingShades', () => {
  it('renders one button per shade', () => {
    render(<NearestPassingShades shades={SHADES} allPass onSelect={vi.fn()} />);

    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('calls onSelect with the clicked shade', async () => {
    const onSelect = vi.fn();
    render(<NearestPassingShades shades={SHADES} allPass onSelect={onSelect} />);

    await userEvent.click(screen.getByRole('button', { name: 'Use #333333 as the foreground color' }));

    expect(onSelect).toHaveBeenCalledWith('#333333');
  });

  it('marks the first shade as recommended when every shade passes', () => {
    render(<NearestPassingShades shades={SHADES} allPass onSelect={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Use #111111 as the foreground color (recommended)' })).toBeInTheDocument();
    expect(screen.getByText('Click a shade to lock AAA at every size.')).toBeInTheDocument();
  });

  it('does not recommend any shade and shows a failure caption when none pass', () => {
    render(<NearestPassingShades shades={SHADES} allPass={false} onSelect={vi.fn()} />);

    expect(screen.queryByText(/recommended/)).not.toBeInTheDocument();
    expect(screen.getByText(/None of these reach AAA/)).toBeInTheDocument();
  });
});
