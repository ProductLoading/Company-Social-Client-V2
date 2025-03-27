// src/features/post-file/postFileMutations.ts
import { gql } from '@apollo/client';

export const UPLOAD_FILE_TO_POST = gql`
  mutation UploadFileToPost($postId: String!, $file: Upload!) {
    uploadPostFile(postId: $postId, file: $file) {
      fileId
      filename
      mimetype
      url
    }
  }
`;
