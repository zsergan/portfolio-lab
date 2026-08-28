import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { CurrentlyCard } from './CurrentlyCard';

describe('CurrentlyCard', () => {
  it('renders the updated timestamp and each key/value line', () => {
    render(
      <CurrentlyCard
        updated="updated aug 2026"
        lines={[
          { key: 'building', value: 'A portfolio lab' },
          { key: 'reading', value: 'Refactoring UI' },
        ]}
      />,
    );

    expect(screen.getByText('updated aug 2026')).toBeInTheDocument();
    expect(screen.getByText('building')).toBeInTheDocument();
    expect(screen.getByText('A portfolio lab')).toBeInTheDocument();
    expect(screen.getByText('reading')).toBeInTheDocument();
    expect(screen.getByText('Refactoring UI')).toBeInTheDocument();
  });
});
