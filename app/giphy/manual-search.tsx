'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useInView } from 'react-intersection-observer';
import type Giphy from 'giphy-api';

interface SearchResponse {
  data: Giphy.GIFObject[];
  pagination: { total_count: number; count: number; offset: number };
}

/**
 * Giphy search using native `fetch` with manual pagination management.
 * Useful for understanding how infinite scroll works under the hood.
 */
export default function ManualSearch() {
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState<Giphy.GIFObject[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const LIMIT = 25;

  const { ref, inView } = useInView();

  const fetchData = async () => {
    if (!query) return;
    setLoading(true);
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.NEXT_PUBLIC_GIPHY_API_KEY}&q=${encodeURIComponent(
        query,
      )}&limit=${LIMIT}&offset=${offset}`,
    );
    const json: SearchResponse = await res.json();
    setGifs((prev) => [...prev, ...json.data]);
    const p = json.pagination;
    setHasMore(p.total_count > p.offset + p.count);
    setOffset((prev) => prev + LIMIT);
    setLoading(false);
  };

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchData();
    }
  }, [inView, hasMore, loading]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setGifs([]);
    setOffset(0);
    fetchData();
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
        {gifs.map((gif) => (
          <img key={gif.id} src={gif.images.fixed_width.url} alt={gif.title} />
        ))}
      </div>
      <div ref={ref} className="h-8" />
      {loading && <p className="text-center">Loading...</p>}
    </div>
  );
}
