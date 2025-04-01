// src/features/user/api/userApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/app/store';
import type { User, CreateUserInput, UpdateUserInput } from '@/features/user/types/userTypes';

const BASE_URL = 'http://localhost:3000/graphql'; // Kendi backend URL’inize göre ayarlayın

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).user.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        // REGISTER
        register: builder.mutation<{ register: string }, CreateUserInput>({
            query: (input) => ({
                method: 'POST',
                body: {
                    query: `
            mutation Register($input: CreateUserInput!) {
              register(input: $input)
            }
          `,
                    variables: { input },
                },
            }),
        }),

        // LOGIN
        login: builder.mutation<{ login: string }, { email: string; password: string }>({
            query: (credentials) => ({
                method: 'POST',
                body: {
                    query: `
            mutation Login($email: String!, $password: String!) {
              login(email: $email, password: $password)
            }
          `,
                    variables: credentials,
                },
            }),
        }),

        // ME
        me: builder.query<User, void>({
            query: () => ({
                method: 'POST',
                body: {
                    query: `
            query Me {
              me {
                userId
                email
                firstName
                lastName
                status
              }
            }
          `,
                },
            }),
            transformResponse: (response: { data: { me: User } }) => response.data.me,
        }),

        // USERS
        users: builder.query<User[], { limit?: number; offset?: number }>({
            query: ({ limit, offset }) => ({
                method: 'POST',
                body: {
                    query: `
            query GetUsers($limit: Int, $offset: Int) {
              users(limit: $limit, offset: $offset) {
                userId
                email
                firstName
                lastName
              }
            }
          `,
                    variables: { limit, offset },
                },
            }),
            transformResponse: (response: { data: { users: User[] } }) => response.data.users,
        }),

        // UPDATE USER
        updateUser: builder.mutation<User, UpdateUserInput>({
            query: (input) => ({
                method: 'POST',
                body: {
                    query: `
            mutation UpdateUser($input: UpdateUserInput!) {
              updateUser(input: $input) {
                userId
                email
                firstName
                lastName
                status
              }
            }
          `,
                    variables: { input },
                },
            }),
            transformResponse: (response: { data: { updateUser: User } }) => response.data.updateUser,
        }),
    }),
});

// Auto-generated hooks
export const {
    useRegisterMutation,
    useLoginMutation,
    useMeQuery,
    useUsersQuery,
    useUpdateUserMutation,
} = userApi;
