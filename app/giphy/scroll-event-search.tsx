'use client';

import { useState, useEffect, FormEvent } from 'react';
import type Giphy from 'giphy-api';

interface SearchResponse {
  data: Giphy.GIFObject[];
  pagination: { total_count: number; count: number; offset: number };
}

/**
 * Giphy search using a plain window scroll listener.
 * This avoids IntersectionObserver and external libraries, illustrating a
 * low-level approach to infinite scroll.
 */
export default function ScrollEventSearch() {
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState<Giphy.GIFObject[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const LIMIT = 25;

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
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        hasMore &&
        !loading
      ) {
        fetchData();
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasMore, loading]);

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
      {loading && <p className="text-center">Loading...</p>}
    </div>
  );
}
