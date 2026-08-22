import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ContactPage } from './ContactPage';

describe('ContactPage', () => {
  it('renders the Contact heading', () => {
    render(<ContactPage />);

    expect(screen.getByRole('heading', { name: 'Contact' })).toBeInTheDocument();
  });
});
