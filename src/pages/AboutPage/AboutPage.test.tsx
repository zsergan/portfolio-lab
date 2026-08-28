import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { AboutPage } from './AboutPage';
import { fetchAbout } from '@/content/api';
import { aboutData } from '@/content/data';
import { labTools } from '@/lab/registry';
import { renderWithQueryClient } from '@/test/renderWithQueryClient';

vi.mock('@/content/api', () => ({
  fetchAbout: vi.fn(),
}));

describe('AboutPage', () => {
  it('shows a loading state, then the fetched heading and stats', async () => {
    vi.mocked(fetchAbout).mockResolvedValueOnce(aboutData);

    renderWithQueryClient(<AboutPage />);

    expect(screen.getByText('Loading…')).toBeInTheDocument();

    expect(await screen.findByRole('heading', { name: aboutData.heading })).toBeInTheDocument();
    expect(screen.getByText(aboutData.stats[0].label)).toBeInTheDocument();
  });

  it('appends a live Lab Tools Shipped stat derived from the registry', async () => {
    vi.mocked(fetchAbout).mockResolvedValueOnce(aboutData);

    renderWithQueryClient(<AboutPage />);

    const shippedCount = labTools.filter((tool) => tool.status === 'done').length;
    expect(await screen.findByText('Lab Tools Shipped')).toBeInTheDocument();
    expect(screen.getByText(`${shippedCount}/${labTools.length}`)).toBeInTheDocument();
  });

  it('shows the currently card with its updated timestamp and lines', async () => {
    vi.mocked(fetchAbout).mockResolvedValueOnce(aboutData);

    renderWithQueryClient(<AboutPage />);

    expect(await screen.findByText(aboutData.currentlyUpdated)).toBeInTheDocument();
    expect(screen.getByText(aboutData.currentlyLines[0].key)).toBeInTheDocument();
    expect(screen.getByText(aboutData.currentlyLines[0].value)).toBeInTheDocument();
  });

  it('shows an error message and a working retry button when the fetch fails', async () => {
    vi.mocked(fetchAbout).mockRejectedValueOnce(new Error('network error'));

    renderWithQueryClient(<AboutPage />);

    expect(await screen.findByText(/Couldn't load this page/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });
});
