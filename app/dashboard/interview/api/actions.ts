'use Client'
const PAGE_SIZE=20;
import type { MultiResponse } from 'giphy-api';

const GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
if (!GIPHY_API_KEY) {
  throw new Error('Missing NEXT_PUBLIC_GIPHY_API_KEY. See README for setup.');
}

export async function getGifs(query?: string, offset: number = 0, limit: number = PAGE_SIZE): Promise<MultiResponse> {
    const type = query?.trim() ? 'search' : 'trending';
    const baseUrl = `https://api.giphy.com/v1/gifs/${type}?api_key=${GIPHY_API_KEY}`;
    const endpoint =
      type === 'search'
        ? `${baseUrl}&q=${encodeURIComponent(query!)}&limit=${limit}&offset=${offset}`
        : `${baseUrl}&limit=${limit}&offset=${offset}`;
    const res = await fetch(endpoint);
    return res.json();
  }
