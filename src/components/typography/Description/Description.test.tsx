import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Description } from './Description';

import styles from './Description.module.css';

describe('Description', () => {
  it('renders its children inside a paragraph', () => {
    render(<Description>Small, focused dev tools.</Description>);

    const description = screen.getByText('Small, focused dev tools.');
    expect(description.tagName).toBe('P');
  });

  it('merges an optional className with its own styling', () => {
    render(<Description className="extra">Small, focused dev tools.</Description>);

    const description = screen.getByText('Small, focused dev tools.');
    expect(description).toHaveClass(styles.description, 'extra');
  });
});
