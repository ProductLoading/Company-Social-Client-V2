// src/graphql/socialApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlUploadBaseQuery } from '@/graphql/graphqlUploadBaseQuery';

export const socialApi = createApi({
  reducerPath: 'socialApi',
  baseQuery: graphqlUploadBaseQuery,
  tagTypes: ['Comment', 'Post', 'User'],
  endpoints: () => ({}),
});
