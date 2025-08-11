'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useInView } from 'react-intersection-observer';
import GifGrid from './GifGrid';
import type { MultiResponse } from 'giphy-api';

const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
if (!GIPHY_API_KEY) {
  throw new Error('Missing NEXT_PUBLIC_GIPHY_API_KEY. See README for setup.');
}
const PAGE_SIZE = 20;

async function getGifs(query?: string, offset: number = 0, limit: number = PAGE_SIZE): Promise<MultiResponse> {
  const type = query?.trim() ? 'search' : 'trending';
  const baseUrl = `https://api.giphy.com/v1/gifs/${type}?api_key=${GIPHY_API_KEY}`;
  const endpoint =
    type === 'search'
      ? `${baseUrl}&q=${encodeURIComponent(query!)}&limit=${limit}&offset=${offset}`
      : `${baseUrl}&limit=${limit}&offset=${offset}`;
  const res = await fetch(endpoint);
  return res.json();
}

export default function GifPanel() {
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const { ref, inView } = useInView();

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<
    MultiResponse,
    Error,
    InfiniteData<MultiResponse, number>,
    [string, string?],
    number
  >({
    queryKey: ['gifs', debouncedQuery],
    queryFn: ({ pageParam = 0 }) => getGifs(debouncedQuery, pageParam, PAGE_SIZE),
    initialPageParam: 0,
    getPreviousPageParam: (firstPage) => {
      const { offset = 0 } = firstPage.pagination ?? {};
      if (offset === 0) return undefined;
      const prevOffset = Math.max(0, offset - PAGE_SIZE);
      return Math.floor(prevOffset / PAGE_SIZE);
    },
    getNextPageParam: (lastPage) => {
      const { offset = 0, count = PAGE_SIZE, total_count = 0 } = lastPage.pagination ?? {};
      const nextOffset = offset + count;
      return nextOffset >= total_count ? undefined : Math.floor(nextOffset / PAGE_SIZE);
    },
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

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

      {data && <GifGrid allGifs={data.pages} />}

      <div style={{ display: 'flex', justifyContent: 'center', padding: 16 }}>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #e5e7eb',
            background: '#fff',
            cursor: hasNextPage ? 'pointer' : 'not-allowed',
          }}
        >
          {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load more' : 'Nothing more to load'}
        </button>
      </div>
    </section>
  );
} 