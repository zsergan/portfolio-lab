import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TagList } from './TagList';

import tagStyles from '../Tag/Tag.module.css';

describe('TagList', () => {
  it('renders a tag for each entry', () => {
    render(<TagList tags={['React', 'TypeScript']} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('forwards the variant prop to every tag', () => {
    render(<TagList tags={['React', 'TypeScript']} variant="muted" />);

    expect(screen.getByText('React')).toHaveClass(tagStyles.muted);
    expect(screen.getByText('TypeScript')).toHaveClass(tagStyles.muted);
  });
});
