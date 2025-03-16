import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($limit: Int, $offset: Int) {
    users(limit: $limit, offset: $offset) {
      userId
      email
      firstName
      lastName
      status
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      userId
      email
      firstName
      lastName
      status
      roles {
        roleId
        name
      }
    }
  }
`;
