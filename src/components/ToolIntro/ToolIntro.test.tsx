import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ToolIntro } from './ToolIntro';
import { labTools } from '@/lab/registry';

describe('ToolIntro', () => {
  it("renders the tool's number, title, description, and topics from the registry", () => {
    const index = labTools.findIndex((tool) => tool.id === 'color-contrast-checker');
    const tool = labTools[index];

    render(<ToolIntro toolId="color-contrast-checker" />);

    expect(screen.getByText(String(index + 1).padStart(2, '0'))).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: tool.title })).toBeInTheDocument();
    expect(screen.getByText(tool.description)).toBeInTheDocument();

    for (const topic of tool.topics ?? []) {
      expect(screen.getByText(topic)).toBeInTheDocument();
    }
  });

  it('renders nothing for an unknown tool id', () => {
    const { container } = render(<ToolIntro toolId="does-not-exist" />);

    expect(container).toBeEmptyDOMElement();
  });
});
