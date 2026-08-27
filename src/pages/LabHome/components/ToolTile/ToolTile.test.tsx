import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';

import { ToolTile } from './ToolTile';
import type { LabTool } from '@/lab/registry';

const doneTool: LabTool = {
  id: 'json-formatter',
  title: 'JSON Formatter & Validator',
  description: 'Test description.',
  highlights: '',
  status: 'done',
  path: '/lab/json-formatter',
  topics: ['TypeScript'],
};

const plannedTool: LabTool = {
  id: 'snippet-vault',
  title: 'Snippet Vault',
  description: 'Test description.',
  highlights: '',
  status: 'planned',
  path: '/lab/snippet-vault',
  topics: ['Testing'],
};

function renderTile(tool: LabTool) {
  return render(
    <MemoryRouter>
      <ToolTile tool={tool} />
    </MemoryRouter>,
  );
}

describe('ToolTile', () => {
  it('renders a done tool as a real link with a "shipped" badge', () => {
    renderTile(doneTool);

    const link = screen.getByRole('link', { name: /JSON Formatter/ });
    expect(link).toHaveAttribute('href', '/lab/json-formatter');
    expect(screen.getByText('shipped')).toBeInTheDocument();
  });

  it('renders a planned tool as non-interactive with a "planned" badge', () => {
    renderTile(plannedTool);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('planned')).toBeInTheDocument();
  });

  it("shows the tool's registry position as its number", () => {
    renderTile(doneTool);

    expect(screen.getByText('01')).toBeInTheDocument();
  });

  it('renders without a tags row when the tool has no topics', () => {
    const { container } = renderTile({ ...doneTool, topics: undefined });

    expect(container.querySelector('ul')).not.toBeInTheDocument();
  });
});
