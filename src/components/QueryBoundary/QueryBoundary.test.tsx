import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { QueryBoundary } from './QueryBoundary';

describe('QueryBoundary', () => {
  it('renders a loading message while pending', () => {
    render(
      <QueryBoundary isPending isError={false} onRetry={vi.fn()}>
        <p>content</p>
      </QueryBoundary>,
    );

    expect(screen.getByText('Loading…')).toBeInTheDocument();
    expect(screen.queryByText('content')).not.toBeInTheDocument();
  });

  it('renders an error message with a working retry button', async () => {
    const onRetry = vi.fn();
    render(
      <QueryBoundary isPending={false} isError onRetry={onRetry}>
        <p>content</p>
      </QueryBoundary>,
    );

    expect(screen.getByText(/Couldn't load this page/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('renders children once loaded successfully', () => {
    render(
      <QueryBoundary isPending={false} isError={false} onRetry={vi.fn()}>
        <p>content</p>
      </QueryBoundary>,
    );

    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
