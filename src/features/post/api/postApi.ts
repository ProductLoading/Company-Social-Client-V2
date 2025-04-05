// src/features/post/post.api.ts
import { socialApi } from '@/graphql/socialApi'
import { GET_POSTS, CREATE_POST } from './graphql/post.queries';
import type { PostEntity, CreatePostDto } from '../types/post.types';

export const postApi = socialApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<PostEntity[], void>({
      query: () => ({
        document: GET_POSTS,
      }),
      transformResponse: (res: any) => res.feed,
      providesTags: ['Post'],
    }),

    createPost: builder.mutation<PostEntity, CreatePostDto>({
      query: (input) => ({
        document: CREATE_POST,
        variables: { createPostInput: input },
      }),
      transformResponse: (res: any) => res.createPost,
      invalidatesTags: ['Post'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetPostsQuery, useCreatePostMutation } = postApi;
