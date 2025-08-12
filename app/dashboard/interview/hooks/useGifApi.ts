// app/dashboard/interview/useGifsApi.ts
'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import type { MultiResponse, GIFObject } from 'giphy-api';
import {getGifs} from '../api/actions'
const PAGE_SIZE = 20;

type GifsResult = UseInfiniteQueryResult<InfiniteData<MultiResponse, number>, Error>;
type GifsControls = Pick<GifsResult, 'fetchNextPage' | 'isFetchingNextPage' | 'hasNextPage'>;

export default function useGifsApi({debouncedQuery}: {debouncedQuery: string}):  GifsControls & {
    data: InfiniteData<MultiResponse, number> | undefined;
    items: GIFObject[] | undefined;
  } {
    const q =  useInfiniteQuery<
        MultiResponse,
        Error,
        InfiniteData<MultiResponse, number>,
        [string, string?],
        number
    >({
        queryKey: ['infiniteGifs', debouncedQuery],
        queryFn: ({ pageParam = 0 }) => {
            console.log('pageParam', pageParam)
            return getGifs(debouncedQuery, pageParam, PAGE_SIZE)},
        initialPageParam: 0,
        getPreviousPageParam: (firstPage) => {
        const { offset = 0 } = firstPage.pagination ?? {};
        if (offset === 0) return undefined;
        const prevOffset = Math.max(0, offset - PAGE_SIZE);
        return prevOffset; // return offset
        },
        getNextPageParam: (lastPage) => {
        const { offset = 0, count = PAGE_SIZE, total_count = 0 } = lastPage.pagination ?? {};
        const nextOffset = offset + count;
        return nextOffset >= total_count ? undefined : nextOffset; // return offset
        },
    });
    const items = q.data?.pages.flatMap((r) => r.data);
    return {
      fetchNextPage: q.fetchNextPage,
      isFetchingNextPage: q.isFetchingNextPage,
      hasNextPage: q.hasNextPage,
      data: q.data,
      items,
    };
}