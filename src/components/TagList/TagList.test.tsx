import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TagList } from './TagList';

describe('TagList', () => {
  it('renders a tag for each entry', () => {
    render(<TagList tags={['React', 'TypeScript']} />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});
