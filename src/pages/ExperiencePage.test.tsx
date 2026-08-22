import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ExperiencePage } from './ExperiencePage';

describe('ExperiencePage', () => {
  it('renders the Experience heading', () => {
    render(<ExperiencePage />);

    expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();
  });
});
