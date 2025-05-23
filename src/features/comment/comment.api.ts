// src/features/comment/api/comment.api.ts

import { socialApi } from '@/graphql/socialApi'; // the base createApi
import { GET_COMMENTS_BY_POST } from './comment.queries';
import { CREATE_COMMENT, DELETE_COMMENT } from './comment.mutations';
import type { IComment, CreateCommentDto } from './comment.types'; // adjust path if needed

/**
 * Extend your base `socialApi` with Comment endpoints.
 */
export const extendedCommentApi = socialApi.injectEndpoints({
  endpoints: (builder) => ({
    // 1) Get comments for a specific Post
    getCommentsByPost: builder.query<
      IComment[],
      { postId: string; limit?: number }
    >({
      query: ({ postId, limit = 2 }) => ({
        document: GET_COMMENTS_BY_POST, // GraphQL DocumentNode
        variables: { postId, limit },
      }),
      transformResponse: (response: any) => {
        // Adjust your transform logic as needed
        return response?.post?.comments ?? [];
      },
      providesTags: (result, _error, { postId }) =>
        result
          ? [
              ...result.map((comment) => ({
                type: 'Comment' as const,
                id: comment.id,
              })),
              { type: 'Comment', id: `POST-${postId}` },
            ]
          : [{ type: 'Comment', id: `POST-${postId}` }],
    }),

    // 2) Create comment
    createComment: builder.mutation<IComment, CreateCommentDto>({
      query: (input) => ({
        document: CREATE_COMMENT,
        variables: { input },
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: 'Comment', id: `POST-${arg.postId}` },
      ],
    }),

    // 3) Delete comment
    deleteComment: builder.mutation<
      boolean,
      { commentId: string; postId: string }
    >({
      query: ({ commentId }) => ({
        document: DELETE_COMMENT,
        variables: { commentId },
      }),
      invalidatesTags: (_res, _err, { commentId, postId }) => [
        // Invalidate the single comment + the list for that post
        { type: 'Comment', id: commentId },
        { type: 'Comment', id: `POST-${postId}` },
      ],
    }),
  }),
  overrideExisting: false,
});

// Export hooks generated by RTK Query
export const {
  useGetCommentsByPostQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = extendedCommentApi;
