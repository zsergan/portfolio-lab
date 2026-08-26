import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { WcagChecksGrid } from './WcagChecksGrid';

describe('WcagChecksGrid', () => {
  it('passes every check at the maximum ratio', () => {
    render(<WcagChecksGrid ratio={21} />);

    expect(screen.getAllByText('pass')).toHaveLength(4);
  });

  it('fails every check at the minimum ratio', () => {
    render(<WcagChecksGrid ratio={1} />);

    expect(screen.getAllByText('fail')).toHaveLength(4);
  });

  it('passes only the large-text checks at 3.5:1', () => {
    render(<WcagChecksGrid ratio={3.5} />);

    expect(screen.getAllByText('pass')).toHaveLength(1);
    expect(screen.getAllByText('fail')).toHaveLength(3);
  });
});
