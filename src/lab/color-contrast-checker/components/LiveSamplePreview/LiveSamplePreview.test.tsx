import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { LiveSamplePreview } from './LiveSamplePreview';

describe('LiveSamplePreview', () => {
  it('colors the preview text and background with the given foreground/background', () => {
    render(<LiveSamplePreview foreground="#3d2f6b" background="#f2eee4" />);

    const preview = screen.getByText('Heading, 22px bold').parentElement;
    expect(preview).toHaveStyle({ color: '#3d2f6b', background: '#f2eee4' });
  });

  it('renders the heading, body, and caption sample lines', () => {
    render(<LiveSamplePreview foreground="#3d2f6b" background="#f2eee4" />);

    expect(screen.getByText('Heading, 22px bold')).toBeInTheDocument();
    expect(screen.getByText(/Body copy at 15px/)).toBeInTheDocument();
    expect(screen.getByText(/Caption at 12px/)).toBeInTheDocument();
  });
});
