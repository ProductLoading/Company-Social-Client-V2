// 📁 src/features/feed/hooks.ts
import { useQuery } from '@apollo/client';
import { GET_FEED } from './feedQueries';
import { Post } from './types';

export function useFeed() {
  const {
    data,
    loading,
    error,
    refetch: refetchFeed,
  } = useQuery<{ feed: Post[] }>(GET_FEED);







  return {
    posts: data?.feed ?? [],
    loading,
    error: error?.message || null,
    refetchFeed,

  };
}
