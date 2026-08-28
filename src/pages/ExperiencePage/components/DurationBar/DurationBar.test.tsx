import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { DurationBar } from './DurationBar';

import styles from './DurationBar.module.css';

describe('DurationBar', () => {
  it('fills the full width when months equals maxMonths', () => {
    const { container } = render(<DurationBar months={31} maxMonths={31} />);

    expect(container.querySelector(`.${styles.fill}`)).toHaveStyle({ width: '100%' });
  });

  it('fills a proportional width otherwise', () => {
    const { container } = render(<DurationBar months={12} maxMonths={31} />);

    expect(container.querySelector(`.${styles.fill}`)).toHaveStyle({ width: '39%' });
  });

  it('is hidden from assistive tech, since it is purely decorative', () => {
    const { container } = render(<DurationBar months={10} maxMonths={31} />);

    expect(container.querySelector(`.${styles.track}`)).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders an empty bar instead of NaN% when maxMonths is 0', () => {
    const { container } = render(<DurationBar months={0} maxMonths={0} />);

    expect(container.querySelector(`.${styles.fill}`)).toHaveStyle({ width: '0%' });
  });

  it('renders an empty bar for a 0-month entry among nonzero peers', () => {
    const { container } = render(<DurationBar months={0} maxMonths={31} />);

    expect(container.querySelector(`.${styles.fill}`)).toHaveStyle({ width: '0%' });
  });
});
