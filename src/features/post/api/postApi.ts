// 🔌 RTK Query + Apollo baseQuery entegrasyonu
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryApollo } from '@/config/baseQueryApollo';
import { CREATE_POST, GET_POSTS } from './graphql/post.queries';
import { PostEntity, CreatePostDto } from '../types/post.types';

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: baseQueryApollo,
  endpoints: (builder) => ({
    getPosts: builder.query<PostEntity[], void>({
      query: () => ({
        document: GET_POSTS,
      }),
      transformResponse: (res: any) => res.feed,
    }),
    createPost: builder.mutation<PostEntity, CreatePostDto>({
      query: (input) => ({
        document: CREATE_POST,
        variables: { createPostInput: input },
      }),
      transformResponse: (res: any) => res.createPost,
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation } = postApi;
