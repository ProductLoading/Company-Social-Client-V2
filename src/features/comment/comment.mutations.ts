// src/features/comment/api/comment.mutations.ts
import { gql } from 'graphql-tag';

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      _id
      content
      createdAt
      postId
      files {
        _id
        fileUrl
        fileName
        fileType
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: String!) {
    deleteComment(commentId: $commentId)
  }
`;