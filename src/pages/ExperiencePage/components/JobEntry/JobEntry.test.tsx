import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { JobEntry } from './JobEntry';
import type { ExperienceEntry } from '@/content/data';

const entry: ExperienceEntry = {
  years: 'May 2022 — Nov 2024',
  months: 31,
  role: 'Senior Software Engineer',
  company: 'EPAM Systems',
  client: 'Global B2B distributor',
  description: 'Built the customer-facing Claims module.',
  highlights: ['Implemented a multi-step claim flow.'],
  tags: ['React', 'TypeScript'],
};

describe('JobEntry', () => {
  it('renders the period, role, and company', () => {
    render(
      <ul>
        <JobEntry entry={entry} maxMonths={31} />
      </ul>,
    );

    expect(screen.getByText('May 2022 — Nov 2024')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Senior Software Engineer' })).toBeInTheDocument();
    expect(screen.getByText('EPAM Systems')).toBeInTheDocument();
  });

  it('renders the client context line only when present', () => {
    const { rerender } = render(
      <ul>
        <JobEntry entry={entry} maxMonths={31} />
      </ul>,
    );
    expect(screen.getByText('Global B2B distributor')).toBeInTheDocument();

    rerender(
      <ul>
        <JobEntry entry={{ ...entry, client: undefined }} maxMonths={31} />
      </ul>,
    );
    expect(screen.queryByText('Global B2B distributor')).not.toBeInTheDocument();
  });

  it('renders every highlight and tag', () => {
    render(
      <ul>
        <JobEntry entry={entry} maxMonths={31} />
      </ul>,
    );

    expect(screen.getByText('Implemented a multi-step claim flow.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders without a highlights list when the entry has none', () => {
    const { container } = render(
      <ul>
        <JobEntry entry={{ ...entry, highlights: undefined }} maxMonths={31} />
      </ul>,
    );

    // Only the test's own wrapper <ul> and TagList's own <ul> remain —
    // JobEntry's own highlights <ul> is the one that should be absent.
    expect(container.querySelectorAll('ul')).toHaveLength(2);
  });
});
