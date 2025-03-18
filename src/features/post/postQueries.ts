// src/features/post/postQueries.ts
import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
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

export const GET_POST = gql`
  query GetPost($postId: ID!) {
    getPost(id: $postId) {
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
