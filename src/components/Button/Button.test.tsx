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

  it('calls onClick for the primary and secondary variants too', async () => {
    const user = userEvent.setup();
    const onPrimary = vi.fn();
    const onSecondary = vi.fn();

    render(
      <>
        <Button onClick={onPrimary} variant="primary">
          Swap
        </Button>
        <Button onClick={onSecondary} variant="secondary">
          Copy pair
        </Button>
      </>,
    );

    await user.click(screen.getByRole('button', { name: 'Swap' }));
    await user.click(screen.getByRole('button', { name: 'Copy pair' }));

    expect(onPrimary).toHaveBeenCalledOnce();
    expect(onSecondary).toHaveBeenCalledOnce();
  });

  it('exposes aria-pressed when given, and omits it entirely otherwise', () => {
    render(
      <>
        <Button onClick={vi.fn()} ariaPressed={true}>
          Pretty
        </Button>
        <Button onClick={vi.fn()}>Copy</Button>
      </>,
    );

    expect(screen.getByRole('button', { name: 'Pretty' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Copy' })).not.toHaveAttribute('aria-pressed');
  });
});
