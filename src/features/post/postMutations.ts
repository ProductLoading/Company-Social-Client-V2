// src/features/post/postMutations.ts
import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      postId
      title
      content
      postType
      visibilityScope
      createdAt
      updatedAt
      user {
        userId
        firstName
        lastName
      }
      files {
        fileId
        filename
        mimetype
        url
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($postId: String!) {
    deletePost(postId: $postId)
  }
`;

// Eğer updatePost kullanıyorsan (opsiyonel):
export const UPDATE_POST = gql`
  mutation UpdatePost($updatePostInput: UpdatePostInput!) {
    updatePost(updatePostInput: $updatePostInput) {
      postId
      title
      content
      postType
      visibilityScope
      createdAt
      updatedAt
      files {
        fileId
        filename
        url
      }
    }
  }
`;
