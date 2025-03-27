import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      postId
      title
      content
      postType
      visibilityScope
    }
  }
`;

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

