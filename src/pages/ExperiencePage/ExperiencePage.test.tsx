import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ExperiencePage } from './ExperiencePage';
import { experienceData } from '@/content/data';

function renderExperiencePage() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ExperiencePage />
    </QueryClientProvider>,
  );
}

describe('ExperiencePage', () => {
  it('shows a loading state, then the fetched timeline entries', async () => {
    renderExperiencePage();

    expect(screen.getByText('Loading…')).toBeInTheDocument();

    const firstEntry = experienceData[0];
    expect(await screen.findByText(firstEntry.company)).toBeInTheDocument();
    expect(screen.getByText(firstEntry.role)).toBeInTheDocument();
  });
});
