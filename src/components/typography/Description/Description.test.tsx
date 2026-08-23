import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Description } from './Description';

describe('Description', () => {
  it('renders its children inside a paragraph', () => {
    render(<Description>Small, focused dev tools.</Description>);

    const description = screen.getByText('Small, focused dev tools.');
    expect(description.tagName).toBe('P');
  });
});
