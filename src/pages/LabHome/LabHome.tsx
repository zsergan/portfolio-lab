import { useState } from 'react';

import { FilterChips } from './components/FilterChips/FilterChips';
import { ProgressStrip } from './components/ProgressStrip/ProgressStrip';
import { ToolTile } from './components/ToolTile/ToolTile';
import { Card, Description, Eyebrow } from '@/components';
import { labTools } from '@/lab/registry';
import type { ToolStatus } from '@/lab/registry';

import styles from './LabHome.module.css';

type Filter = 'all' | ToolStatus;

const FILTER_OPTIONS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'done', label: 'Shipped' },
  { value: 'planned', label: 'Planned' },
];

export function LabHome() {
  const [filter, setFilter] = useState<Filter>('all');

  const doneCount = labTools.filter((tool) => tool.status === 'done').length;
  const visibleTools = filter === 'all' ? labTools : labTools.filter((tool) => tool.status === filter);

  return (
    <div>
      <Eyebrow>lab</Eyebrow>
      {/* "Ten" is literal, matching labTools.length (10) — update this copy
          alongside registry.ts if a tool is ever added to or removed from
          the roadmap. */}
      <h2 className={styles.heading}>Ten small tools, built in the open.</h2>
      <Description className={styles.intro}>
        No accounts, no servers, no analytics. Each one works through a specific front-end problem end to end, and
        the build note ships with it.
      </Description>

      <Card className={styles.toolbar}>
        <div className={styles.toolbarRow}>
          <div className={styles.progress}>
            <span className={styles.progressLabel}>
              {doneCount} / {labTools.length} shipped
            </span>
            <ProgressStrip done={doneCount} total={labTools.length} />
          </div>

          <FilterChips options={FILTER_OPTIONS} value={filter} onChange={setFilter} />
        </div>
      </Card>

      {visibleTools.length === 0 ? (
        <p className={styles.empty}>No tools match this filter yet.</p>
      ) : (
        <ul className={styles.tileGrid}>
          {visibleTools.map((tool) => (
            <li key={tool.id}>
              <ToolTile tool={tool} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
