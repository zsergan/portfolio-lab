import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Eyebrow } from './Eyebrow';

describe('Eyebrow', () => {
  it('renders its children prefixed with //', () => {
    render(<Eyebrow>about</Eyebrow>);

    expect(screen.getByText('// about')).toBeInTheDocument();
  });
});
