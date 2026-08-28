import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ContactPage } from './ContactPage';
import { fetchContact } from '@/content/api';
import { contactData } from '@/content/data';
import { renderWithQueryClient } from '@/test/renderWithQueryClient';

vi.mock('@/content/api', () => ({
  fetchContact: vi.fn(),
}));

beforeEach(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    configurable: true,
  });
});

describe('ContactPage', () => {
  it('shows a loading state, then the fetched headline, availability, and rows', async () => {
    vi.mocked(fetchContact).mockResolvedValueOnce(contactData);

    renderWithQueryClient(<ContactPage />);

    expect(screen.getByText('Loading…')).toBeInTheDocument();

    expect(await screen.findByText(contactData.headline)).toBeInTheDocument();
    expect(screen.getByText(contactData.availability)).toBeInTheDocument();

    const firstRow = contactData.rows[0];
    expect(screen.getByText(firstRow.label)).toBeInTheDocument();
    expect(screen.getByText(firstRow.value)).toBeInTheDocument();
  });

  it('copies a row\'s value to the clipboard and shows a copied chip only on that row', async () => {
    vi.mocked(fetchContact).mockResolvedValueOnce(contactData);

    renderWithQueryClient(<ContactPage />);

    const emailRow = await screen.findByRole('button', { name: /Email/ });
    await userEvent.click(emailRow);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(contactData.rows[0].value);
    expect(await screen.findByText('copied ✓')).toBeInTheDocument();

    const githubRow = screen.getByRole('button', { name: /GitHub/ });
    expect(githubRow).toHaveTextContent('copy');
    expect(githubRow).not.toHaveTextContent('copied ✓');
  });

  it('moves the copied chip to a newly-clicked row, clearing it from the previous one', async () => {
    vi.mocked(fetchContact).mockResolvedValueOnce(contactData);

    renderWithQueryClient(<ContactPage />);

    const emailRow = await screen.findByRole('button', { name: /Email/ });
    await userEvent.click(emailRow);
    expect(emailRow).toHaveTextContent('copied ✓');

    const githubRow = screen.getByRole('button', { name: /GitHub/ });
    await userEvent.click(githubRow);

    expect(githubRow).toHaveTextContent('copied ✓');
    expect(emailRow).not.toHaveTextContent('copied ✓');
  });

  it('re-copies correctly when the same row is clicked again', async () => {
    vi.mocked(fetchContact).mockResolvedValueOnce(contactData);

    renderWithQueryClient(<ContactPage />);

    const emailRow = await screen.findByRole('button', { name: /Email/ });
    await userEvent.click(emailRow);
    expect(emailRow).toHaveTextContent('copied ✓');

    await userEvent.click(emailRow);
    expect(emailRow).toHaveTextContent('copied ✓');
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(2);
  });

  it('shows the footnote hint', async () => {
    vi.mocked(fetchContact).mockResolvedValueOnce(contactData);

    renderWithQueryClient(<ContactPage />);

    expect(await screen.findByText(contactData.footnote)).toBeInTheDocument();
  });

  it('shows an error message and a working retry button when the fetch fails', async () => {
    vi.mocked(fetchContact).mockRejectedValueOnce(new Error('network error'));

    renderWithQueryClient(<ContactPage />);

    expect(await screen.findByText(/Couldn't load this page/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Try again' })).toBeInTheDocument();
  });
});
