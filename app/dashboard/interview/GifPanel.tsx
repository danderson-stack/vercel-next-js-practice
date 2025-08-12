'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useInView } from 'react-intersection-observer';
import GifGrid from './components/GifGrid';
import useGifApi from './hooks/useGifApi'
import Loadmore from './components/LoadMoreButton';

export default function GifPanel() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const { ref, inView } = useInView();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage, items } = useGifApi({debouncedQuery})

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search GIFs..."
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            maxWidth: 480,
            padding: '10px 14px',
            border: '2px solid #e5e7eb',
            borderRadius: 8,
            fontSize: '0.95rem',
            outline: 'none',
          }}
        />
      </div>

      {data && <GifGrid allGifs={items} />}

      <div style={{ display: 'flex', justifyContent: 'center', padding: 16 }}>
        <Loadmore 
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage} />
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load more' : 'Nothing more to load'}
      </div>
    </section>
  );
} 