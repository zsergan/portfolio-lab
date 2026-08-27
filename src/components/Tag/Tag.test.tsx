import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tag } from './Tag';

import styles from './Tag.module.css';

describe('Tag', () => {
  it('renders its children', () => {
    render(<Tag>React</Tag>);

    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('applies the muted variant class when requested', () => {
    render(<Tag variant="muted">Planned</Tag>);

    expect(screen.getByText('Planned')).toHaveClass(styles.tag, styles.muted);
  });

  it('omits the muted class by default', () => {
    render(<Tag>Done</Tag>);

    expect(screen.getByText('Done')).not.toHaveClass(styles.muted);
  });
});
