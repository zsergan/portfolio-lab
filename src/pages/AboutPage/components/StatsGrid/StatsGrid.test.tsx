import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatsGrid } from './StatsGrid';

describe('StatsGrid', () => {
  it('renders a value and label for each stat', () => {
    render(
      <StatsGrid
        stats={[
          { value: '5+yrs', label: 'Experience' },
          { value: '3', label: 'Companies' },
        ]}
      />,
    );

    expect(screen.getByText('5+yrs')).toBeInTheDocument();
    expect(screen.getByText('Experience')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Companies')).toBeInTheDocument();
  });
});
