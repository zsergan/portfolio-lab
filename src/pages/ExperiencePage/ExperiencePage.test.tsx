import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ExperiencePage } from './ExperiencePage';
import { fetchExperience } from '@/content/api';
import { experienceData } from '@/content/data';
import { renderWithQueryClient } from '@/test/renderWithQueryClient';

vi.mock('@/content/api', () => ({
  fetchExperience: vi.fn(),
}));

describe('ExperiencePage', () => {
  it('shows a loading state, then the fetched timeline entries', async () => {
    vi.mocked(fetchExperience).mockResolvedValueOnce(experienceData);

    renderWithQueryClient(<ExperiencePage />);

    expect(screen.getByText('Loading…')).toBeInTheDocument();

    const firstEntry = experienceData[0];
    expect(await screen.findByText(firstEntry.company)).toBeInTheDocument();
    expect(screen.getByText(firstEntry.role)).toBeInTheDocument();
  });

  it('shows an error message and a working retry button when the fetch fails', async () => {
    vi.mocked(fetchExperience).mockRejectedValueOnce(new Error('network error'));

    renderWithQueryClient(<ExperiencePage />);

    expect(await screen.findByText(/Couldn't load this page/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });
});
