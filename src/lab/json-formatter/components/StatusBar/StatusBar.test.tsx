import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatusBar } from './StatusBar';

describe('StatusBar', () => {
  it('shows a neutral waiting message when idle', () => {
    render(<StatusBar id="status" status="idle" />);

    expect(screen.getByText('Waiting for input')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('announces valid JSON together with its key/depth stats', () => {
    render(<StatusBar id="status" status="valid" keyCount={14} depth={4} />);

    const region = screen.getByRole('status');
    expect(region.id).toBe('status');
    expect(region).toHaveTextContent('valid JSON');
    expect(region).toHaveTextContent('14 keys · depth 4');
  });

  it('announces invalid JSON together with the parse error message', () => {
    render(<StatusBar id="status" status="error" message="Unexpected token o in JSON at position 1" />);

    const region = screen.getByRole('status');
    expect(region).toHaveTextContent('invalid JSON');
    expect(region).toHaveTextContent('Unexpected token o in JSON at position 1');
  });

  it('reports 0 keys correctly, e.g. for an empty object', () => {
    render(<StatusBar id="status" status="valid" keyCount={0} depth={1} />);

    expect(screen.getByRole('status')).toHaveTextContent('0 keys · depth 1');
  });
});
