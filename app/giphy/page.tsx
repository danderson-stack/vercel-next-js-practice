'use client';

import { useState } from 'react';
import ReactQuerySearch from './react-query-search';
import ManualSearch from './manual-search';
import ScrollEventSearch from './scroll-event-search';

const tabs = [
  { id: 'rq', label: 'React Query', element: <ReactQuerySearch /> },
  { id: 'manual', label: 'Manual Fetch', element: <ManualSearch /> },
  { id: 'scroll', label: 'Scroll Event', element: <ScrollEventSearch /> },
];

/**
 * Standalone page showcasing three strategies for Giphy infinite scroll.
 */
export default function GiphyPage() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)?.element;

  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`pb-1 border-b-2 ${
              active === t.id ? 'border-blue-500' : 'border-transparent'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {current}
    </div>
  );
}
