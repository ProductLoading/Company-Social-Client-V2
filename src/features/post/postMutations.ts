// src/features/post/postMutations.ts
import { gql } from '@apollo/client';

// Post Oluşturma
export const CREATE_POST = gql`
  mutation CreatePost($createPostDto: CreatePostDto!) {
    createPost(createPostDto: $createPostDto) {
      postId
      title
      content
      postType
      visibilityScope
      createdAt
      updatedAt
      files {
        id
        url
        fileType
      }
      user {
        userId
        firstName
        lastName
      }
    }
  }
`;

// Post Güncelleme
export const UPDATE_POST = gql`
  mutation UpdatePost($updatePostDto: UpdatePostDto!) {
    updatePost(updatePostDto: $updatePostDto) {
      postId
      title
      content
      postType
      visibilityScope
      createdAt
      updatedAt
      files {
        id
        url
        fileType
      }
      user {
        userId
        firstName
        lastName
      }
    }
  }
`;

// Post Silme
export const DELETE_POST = gql`
  mutation DeletePost($postId: String!) {
    deletePost(postId: $postId)
  }
`;
