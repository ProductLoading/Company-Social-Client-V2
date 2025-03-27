// 🧠 gql ile GraphQL sorgu ve mutasyonlar
import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      postId
      title
      content
      postType
      visibilityScope
      files {
        fileId
        filename
        url
      }
    }
  }
`;

export const GET_POSTS = gql`
  query GetPosts {
    feed {
      postId
      title
      content
      postType
      visibilityScope
      createdAt
      user {
        userId
        fullName
      }
      files {
        fileId
        filename
        url
      }
    }
  }
`;
