import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ShortcutsCard } from './ShortcutsCard';

describe('ShortcutsCard', () => {
  it('renders each shortcut label with its formatted key combo', () => {
    render(
      <ShortcutsCard
        shortcuts={[
          { label: 'Swap colors', combo: 'mod+s' },
          { label: 'Copy pair', combo: 'mod+c' },
          { label: 'Use nearest shade', combo: 'n' },
        ]}
      />,
    );

    expect(screen.getByText('// shortcuts')).toBeInTheDocument();
    expect(screen.getByText('Swap colors')).toBeInTheDocument();
    expect(screen.getByText('⌘S')).toBeInTheDocument();
    expect(screen.getByText('⌘C')).toBeInTheDocument();
    expect(screen.getByText('N')).toBeInTheDocument();
  });

  it('formats named keys with their symbol', () => {
    render(<ShortcutsCard shortcuts={[{ label: 'Format', combo: 'mod+enter' }]} />);

    expect(screen.getByText('⌘⏎')).toBeInTheDocument();
  });

  it('renders nothing for an empty shortcuts list', () => {
    const { container } = render(<ShortcutsCard shortcuts={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
