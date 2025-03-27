// src/features/post-file/postFileQueries.ts
import { gql } from '@apollo/client';

export const GET_FILES_BY_POST = gql`
  query GetFilesByPost($postId: String!) {
    filesByPost(postId: $postId) {
      fileId
      filename
      mimetype
      url
    }
  }
`;
