import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button', { name: 'Click me' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Click me
      </Button>,
    );

    await userEvent.click(screen.getByRole('button', { name: 'Click me' }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('exposes the given accessible name when children are not plain text', () => {
    render(
      <Button onClick={vi.fn()} ariaLabel="Swap">
        ⇄
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Swap' })).toBeInTheDocument();
  });

  it('merges an extra className onto its own', () => {
    render(
      <Button onClick={vi.fn()} className="square">
        Click me
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Click me' })).toHaveClass('square');
  });
});
