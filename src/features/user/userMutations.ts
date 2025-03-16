import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation Register($input: CreateUserInput!) {
    register(input: $input)
  }
`;

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      userId
      firstName
      lastName
      status
    }
  }
`;
