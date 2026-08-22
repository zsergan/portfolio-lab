import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AboutPage } from './AboutPage';

describe('AboutPage', () => {
  it('renders the About heading', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  });
});
