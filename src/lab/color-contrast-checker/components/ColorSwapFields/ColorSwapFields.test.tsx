import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ColorSwapFields } from './ColorSwapFields';

describe('ColorSwapFields', () => {
  it('renders the foreground and background fields with their current values', () => {
    render(
      <ColorSwapFields
        foreground="#000000"
        background="#ffffff"
        onForegroundChange={vi.fn()}
        onBackgroundChange={vi.fn()}
        onSwap={vi.fn()}
      />,
    );

    expect(screen.getByLabelText('Foreground')).toHaveValue('#000000');
    expect(screen.getByLabelText('Background')).toHaveValue('#ffffff');
  });

  it('calls onSwap when the swap button is clicked', async () => {
    const onSwap = vi.fn();
    render(
      <ColorSwapFields
        foreground="#000000"
        background="#ffffff"
        onForegroundChange={vi.fn()}
        onBackgroundChange={vi.fn()}
        onSwap={onSwap}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Swap colors' }));

    expect(onSwap).toHaveBeenCalledOnce();
  });

  it('calls onForegroundChange as the foreground hex field is typed into', async () => {
    const onForegroundChange = vi.fn();
    render(
      <ColorSwapFields
        foreground="#000000"
        background="#ffffff"
        onForegroundChange={onForegroundChange}
        onBackgroundChange={vi.fn()}
        onSwap={vi.fn()}
      />,
    );

    await userEvent.clear(screen.getByLabelText('Foreground'));
    await userEvent.type(screen.getByLabelText('Foreground'), '#123456');

    expect(onForegroundChange).toHaveBeenCalledWith('#123456');
  });
});
