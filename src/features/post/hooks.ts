// src/features/post/hooks.ts
import { useQuery, useMutation } from '@apollo/client';
import { GET_POSTS, GET_POST } from './postQueries';
import { CREATE_POST, UPDATE_POST, DELETE_POST } from './postMutations';
import { Post, CreatePostInput, UpdatePostInput } from './types';

export const usePosts = () => {
  const { data, loading, error, refetch } = useQuery(GET_POSTS);

  const posts: Post[] = data?.getPosts || [];

  return { posts, loading, error, refetch };
};

export const useCreatePost = () => {
  return useMutation(CREATE_POST);
};

export const useUpdatePost = () => {
  return useMutation(UPDATE_POST);
};

export const useDeletePost = () => {
  return useMutation(DELETE_POST);
};

export const useGetPost = (postId: string) => {
  return useQuery(GET_POST, { variables: { postId } });
};
