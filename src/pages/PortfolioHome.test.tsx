import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PortfolioHome } from './PortfolioHome';

describe('PortfolioHome', () => {
  it('renders the about, experience, stack, and contact sections', () => {
    render(<PortfolioHome />);

    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Stack' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
  });
});
