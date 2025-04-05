// src/features/comment/api/comment.queries.ts
import { gql } from 'graphql-tag';

export const GET_COMMENTS_BY_POST = gql`
  query GetCommentsByPost($postId: String!, $limit: Int) {
    post(postId: $postId) {
      comments(limit: $limit) {
        _id
        content
        createdAt
        userId
        postId
        parentCommentId
        files {
          _id
          fileUrl
          fileName
          fileType
        }
      }
    }
  }
`;
