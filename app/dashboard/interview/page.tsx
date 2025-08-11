'use client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

/**
 * 
 * @returns 
 * Requirements:
    1. On the initial page load, it should display the current trending gifs (limit 20).
    2. You should implement infinite scrolling so as the user scrolls down the page more gifs are dynamically loaded automatically.
3. User can type a search keyword in a search field at the top of the page, which then displays the searched gifs dynamically as the user searches.
    4. Clearing the search field should show the trending gifs again.
    5. Styling and layout are less important but it should be mobile and desktop friendly.
    6. Share your screen and try to only interact with the screen you are sharing.
7. Try to explain the steps you are taking and why, why did you decide to create a specific function? Why do A instead of B? etc
    8. Feel free to take shortcuts in order to complete the assignment quickly, and point out the areas you would improve on, given more time, at the end.
    9. You can use any third party libraries that you would like except please refrain from using the Giphy SDKs
    10. At the end of the interview, please email us a zip or link with the final code.
 */
export default function Page() {
  const GIPHY_API_KEY = 'F2Xrk2P2FnKXYSmEUdEzMHbVF1b6up6A';

  const getGifs = async (query?: string) => {
    const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=20`
    
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  };

  const getTrendingGifs = async () => {
    const endpoint = `https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=20`
    
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  };

  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);

// Initial trending query
const { data: trendingData, isLoading: trendingLoading } = useQuery({
  queryKey: ['gifs', 'trending'],
  queryFn: getTrendingGifs,
  enabled: true,
});

// Search query
const { data: searchData, isLoading: searchLoading } = useQuery({
  queryKey: ['gifs', 'search', debouncedQuery],
  queryFn: () => getGifs(debouncedQuery),
  enabled: !!debouncedQuery,
});

// Use search data if available, otherwise trending data
const data = searchData || trendingData;
const isLoading = searchLoading || trendingLoading;

  return (
    <main>
      <h1>Interview</h1>
     <div>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />

        <ul>
          {data?.data.map((gif: any) => (
            <li key={gif.id}>
              <img src={gif.images.downsized.url} alt={gif.title} />
            </li>
          ))}
        </ul>
     </div>
    </main>
  );
}