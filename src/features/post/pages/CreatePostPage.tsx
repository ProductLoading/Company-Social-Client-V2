// src/features/post/postQueries.ts
import { gql } from '@apollo/client';

// ✅ Tüm postları getir
export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      title
      content
      postType
      visibilityScope
      createdAt
      user {
        userId
        firstName
        lastName
      }
    }
  }
`;

// ✅ Tek bir post detayını getir
export const GET_POST = gql`
  query GetPost($postId: ID!) {
    getPost(id: $postId) {
      id
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
    }
  }
`;
