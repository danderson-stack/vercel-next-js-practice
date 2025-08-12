import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import type { UseInfiniteQueryResult } from '@tanstack/react-query';

type Controls = Pick<UseInfiniteQueryResult<unknown, Error>, 'fetchNextPage' | 'isFetchingNextPage' | 'hasNextPage'>;

export default function Loadmore({ fetchNextPage, isFetchingNextPage, hasNextPage }: Controls) {
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <button
      ref={ref}
      onClick={() => fetchNextPage()}
      disabled={!hasNextPage || isFetchingNextPage}
      style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }}
    />
  );
}