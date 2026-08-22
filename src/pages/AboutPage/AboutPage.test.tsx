import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { aboutData } from '@/portfolio/data';
import { AboutPage } from './AboutPage';

function renderAboutPage() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <AboutPage />
    </QueryClientProvider>,
  );
}

describe('AboutPage', () => {
  it('shows a loading state, then the fetched heading and stats', async () => {
    renderAboutPage();

    expect(screen.getByText('Loading…')).toBeInTheDocument();

    expect(await screen.findByRole('heading', { name: aboutData.heading })).toBeInTheDocument();
    expect(screen.getByText(aboutData.stats[0].label)).toBeInTheDocument();
  });
});
