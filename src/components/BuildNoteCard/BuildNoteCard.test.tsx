import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { BuildNoteCard } from './BuildNoteCard';

describe('BuildNoteCard', () => {
  it("renders the tool's build note under a 'build note' eyebrow", () => {
    render(<BuildNoteCard toolId="color-contrast-checker" />);

    expect(screen.getByText('// build note')).toBeInTheDocument();
    expect(screen.getByText(/walks lightness in OKLCH/)).toBeInTheDocument();
  });

  it('renders nothing for a tool with no build note', () => {
    const { container } = render(<BuildNoteCard toolId="json-formatter" />);

    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing for an unknown tool id', () => {
    const { container } = render(<BuildNoteCard toolId="does-not-exist" />);

    expect(container).toBeEmptyDOMElement();
  });
});
