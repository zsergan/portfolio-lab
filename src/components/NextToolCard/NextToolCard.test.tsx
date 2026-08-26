import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { NextToolCard } from './NextToolCard';

function renderCard(currentToolId: string) {
  return render(
    <MemoryRouter>
      <NextToolCard currentToolId={currentToolId} />
    </MemoryRouter>,
  );
}

describe('NextToolCard', () => {
  it('shows the next 2 done tools after the current one, in registry order', () => {
    renderCard('color-contrast-checker');

    const links = screen.getAllByRole('link');
    expect(links.map((link) => link.textContent)).toEqual([
      expect.stringContaining('Unit Converter'),
      expect.stringContaining('JSON Formatter'),
    ]);
    expect(screen.getByRole('link', { name: /Unit Converter/ })).toHaveAttribute('href', '/lab/unit-converter');
  });

  it('wraps around to the start of the done-tools list for the last one', () => {
    renderCard('unit-converter');

    const links = screen.getAllByRole('link');
    expect(links.map((link) => link.textContent)).toEqual([
      expect.stringContaining('JSON Formatter'),
      expect.stringContaining('Color Contrast Checker'),
    ]);
  });

  it('renders nothing for a tool that is not in the registry', () => {
    const { container } = renderCard('does-not-exist');

    expect(container).toBeEmptyDOMElement();
  });
});
