import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ContactPage } from './ContactPage';
import { contactData } from '@/content/data';

function renderContactPage() {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ContactPage />
    </QueryClientProvider>,
  );
}

describe('ContactPage', () => {
  it('shows a loading state, then the fetched contact rows', async () => {
    renderContactPage();

    expect(screen.getByText('Loading…')).toBeInTheDocument();

    const firstRow = contactData[0];
    expect(await screen.findByText(firstRow.label)).toBeInTheDocument();
    expect(screen.getByText(firstRow.value)).toBeInTheDocument();
  });
});
