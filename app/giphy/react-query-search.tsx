'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import type Giphy from 'giphy-api';

interface SearchResponse {
  data: Giphy.GIFObject[];
  pagination: { total_count: number; count: number; offset: number };
}

/**
 * Giphy search powered by React Query.
 * React Query's `useInfiniteQuery` handles caching and pagination,
 * leaving the component to focus on rendering.
 */
export default function ReactQuerySearch() {
  const [query, setQuery] = useState('');

  const fetchGifs = async ({ pageParam = 0 }): Promise<SearchResponse> => {
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&q=${encodeURIComponent(
        query,
      )}&limit=25&offset=${pageParam}`,
    );
    return res.json();
  };

  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['rq-gifs', query],
    queryFn: fetchGifs,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const p = lastPage.pagination;
      return p.total_count > p.offset + p.count ? p.offset + p.count : undefined;
    },
    enabled: !!query,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search GIFs"
          className="border p-2 w-full"
        />
      </form>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {data?.pages.map((page) =>
          page.data.map((gif: Giphy.GIFObject) => (
            <img key={gif.id} src={gif.images.fixed_width.url} alt={gif.title} />
          )),
        )}
      </div>
      <div ref={ref} className="h-8" />
      {isFetchingNextPage && <p className="text-center">Loading...</p>}
    </div>
  );
}
