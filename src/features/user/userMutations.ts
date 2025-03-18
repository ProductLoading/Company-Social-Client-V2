import { gql } from '@apollo/client';

// REGISTER

export const REGISTER_MUTATION = gql`
  mutation Register($input: CreateUserInput!) {
    register(input: $input)
  }
`;

// LOGIN
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

// UPDATE
export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      userId
      email
      firstName
      lastName
      status
    }
  }
`;
