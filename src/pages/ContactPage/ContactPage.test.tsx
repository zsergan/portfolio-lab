import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ContactPage } from './ContactPage';
import { fetchContact } from '@/content/api';
import { contactData } from '@/content/data';
import { renderWithQueryClient } from '@/test/renderWithQueryClient';

vi.mock('@/content/api', () => ({
  fetchContact: vi.fn(),
}));

describe('ContactPage', () => {
  it('shows a loading state, then the fetched contact rows', async () => {
    vi.mocked(fetchContact).mockResolvedValueOnce(contactData);

    renderWithQueryClient(<ContactPage />);

    expect(screen.getByText('Loading…')).toBeInTheDocument();

    const firstRow = contactData[0];
    expect(await screen.findByText(firstRow.label)).toBeInTheDocument();
    expect(screen.getByText(firstRow.value)).toBeInTheDocument();
  });

  it('shows an error message and a working retry button when the fetch fails', async () => {
    vi.mocked(fetchContact).mockRejectedValueOnce(new Error('network error'));

    renderWithQueryClient(<ContactPage />);

    expect(await screen.findByText(/Couldn't load this page/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });
});
