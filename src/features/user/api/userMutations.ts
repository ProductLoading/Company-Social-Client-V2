// src/features/user/api/userMutations.ts

/** Kullanıcı kayıt (register) -> accessToken döner */
export const REGISTER_MUTATION = `
  mutation Register($input: CreateUserInput!) {
    register(input: $input)
  }
`;

/** Kullanıcı giriş (login) -> accessToken döner */
export const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

/** Kullanıcı güncelle */
export const UPDATE_USER_MUTATION = `
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
