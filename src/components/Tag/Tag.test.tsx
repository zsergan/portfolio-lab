import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tag } from './Tag';

describe('Tag', () => {
  it('renders its children', () => {
    render(<Tag>React</Tag>);

    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
