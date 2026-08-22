import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { RetryButton } from './RetryButton';

describe('RetryButton', () => {
  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<RetryButton onClick={onClick} />);

    await userEvent.click(screen.getByRole('button', { name: 'Try again' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
