'use client';

import GifPanel from './GifPanel';
import {FavoritedGifsProvider} from './FavoritedGifsProvider'

export default function Page() {
  return (
    <main>
      <FavoritedGifsProvider>
        <GifPanel />
      </FavoritedGifsProvider>
    </main>
  );
}
