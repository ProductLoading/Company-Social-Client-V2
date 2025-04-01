// src/features/user/api/userApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/app/store';

// GraphQL string'leri import
import { GET_ME, GET_USERS } from './userQueries';
import { REGISTER_MUTATION, LOGIN_MUTATION, UPDATE_USER_MUTATION } from './userMutations';

// Type'lar
import type { User, CreateUserInput, UpdateUserInput } from '@/features/user/types/userTypes';

const BASE_URL = 'http://localhost:3000/graphql'; 

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // userSlice'ta tutulan token'ı al
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    /** REGISTER MUTATION -> createUserInput */
    register: builder.mutation<{ register: string }, CreateUserInput>({
      query: (input) => ({
        url: '', // RTK Query -> 'url' property zorunludur
        method: 'POST',
        body: {
          query: REGISTER_MUTATION,
          variables: { input },
        },
      }),
    }),

    /** LOGIN MUTATION -> email/password */
    login: builder.mutation<{ login: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: '',
        method: 'POST',
        body: {
          query: LOGIN_MUTATION,
          variables: credentials,
        },
      }),
    }),

    /** ME QUERY -> Oturum açan kullanıcının bilgisi */
    me: builder.query<User, void>({
      query: () => ({
        url: '',
        method: 'POST',
        body: {
          query: GET_ME,
        },
      }),
      transformResponse: (res: { data: { me: User } }) => res.data.me,
    }),

    /** USERS QUERY -> limit/offset */
    users: builder.query<User[], { limit?: number; offset?: number }>({
      query: ({ limit, offset }) => ({
        url: '',
        method: 'POST',
        body: {
          query: GET_USERS,
          variables: { limit, offset },
        },
      }),
      transformResponse: (res: { data: { users: User[] } }) => res.data.users,
    }),

    /** UPDATE_USER MUTATION */
    updateUser: builder.mutation<User, UpdateUserInput>({
      query: (input) => ({
        url: '',
        method: 'POST',
        body: {
          query: UPDATE_USER_MUTATION,
          variables: { input },
        },
      }),
      transformResponse: (res: { data: { updateUser: User } }) => res.data.updateUser,
    }),
  }),
});

// RTK Query hook
export const {
  useRegisterMutation,
  useLoginMutation,
  useMeQuery,
  useUsersQuery,
  useUpdateUserMutation,
} = userApi;
