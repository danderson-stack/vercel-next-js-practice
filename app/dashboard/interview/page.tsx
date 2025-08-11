'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import GifGrid from './GifGrid';
import { useInView } from 'react-intersection-observer';

const GIPHY_API_KEY = 'F2Xrk2P2FnKXYSmEUdEzMHbVF1b6up6A';
const PAGE_SIZE = 20;
import type { MultiResponse } from 'giphy-api'; // Import the namespace for types

export default function Page() {
  const { ref, inView } = useInView()
  const getGifs = async (
    query?: string,
    offset: number = 0,
    limit: number = PAGE_SIZE
  ): Promise<MultiResponse> => {
    const type = query?.trim() ? "search" : "trending";
    const baseUrl = `https://api.giphy.com/v1/gifs/${type}?api_key=${GIPHY_API_KEY}`;
  
    const endpoint = type === "search"
      ? `${baseUrl}&q=${encodeURIComponent(query!)}&limit=${PAGE_SIZE}&offset=${offset}`
      : `${baseUrl}&limit=${limit}&offset=${offset}`;
  
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  };

const [query, setQuery] = useState('');
const [debouncedQuery] = useDebounce(query, 500);

const {
  data,
  isFetching,
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
} = useInfiniteQuery<
  MultiResponse,                        // TQueryFnData (resolved)
  Error,                                // TError
  InfiniteData<MultiResponse, number>,  // TData => has `.pages`
  [string, string?],                    // TQueryKey
  number                                // TPageParam
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
  if (inView) {
    fetchNextPage()
  }
}, [fetchNextPage, inView])

  return (
    <main>
      <h1>Gif Search/Scroller</h1>
     <div>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      {data && <GifGrid allGifs={data.pages} />}
     </div>
     <div>
      <button
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
      </button>
    </div>
     <div>
      {isFetching && !isFetchingNextPage
        ? 'Fetching gifs...'
        : null}
    </div>
    </main>
  );
}