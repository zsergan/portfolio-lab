import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { WorkspaceCard } from './WorkspaceCard';

describe('WorkspaceCard', () => {
  it('renders the filename and its children', () => {
    render(
      <WorkspaceCard filename="contrast.tsx" actions={[]}>
        <p>Body content</p>
      </WorkspaceCard>,
    );

    expect(screen.getByText('contrast.tsx')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('renders each action as a button and fires its onClick', async () => {
    const user = userEvent.setup();
    const onSwap = vi.fn();
    const onCopy = vi.fn();

    render(
      <WorkspaceCard
        filename="contrast.tsx"
        actions={[
          { label: 'Swap', onClick: onSwap },
          { label: 'Copy pair', onClick: onCopy },
        ]}
      >
        <p>Body content</p>
      </WorkspaceCard>,
    );

    await user.click(screen.getByRole('button', { name: 'Swap' }));
    await user.click(screen.getByRole('button', { name: 'Copy pair' }));

    expect(onSwap).toHaveBeenCalledOnce();
    expect(onCopy).toHaveBeenCalledOnce();
  });

  it('disables an action when its disabled flag is set', () => {
    render(
      <WorkspaceCard filename="contrast.tsx" actions={[{ label: 'Swap', onClick: vi.fn(), disabled: true }]}>
        <p>Body content</p>
      </WorkspaceCard>,
    );

    expect(screen.getByRole('button', { name: 'Swap' })).toBeDisabled();
  });
});
