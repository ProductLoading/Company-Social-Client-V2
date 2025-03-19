// src/features/post/postQueries.ts
import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts {
    posts {  # <-- Backend'de name: 'posts'
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

export const GET_POST = gql`
  query GetPost($postId: String!) {
    post(postId: $postId) {  # <-- Backend'de name: 'post'
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
