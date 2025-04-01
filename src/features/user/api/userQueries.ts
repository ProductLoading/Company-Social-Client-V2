// src/features/user/userQueries.ts

/** Tüm kullanıcıları listeleme (pagination) */
export const GET_USERS = `
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

/** Tek bir kullanıcıyı ID ile getirme */
export const GET_USER = `
  query GetUser($userId: String!) {
    user(userId: $userId) {
      userId
      email
      firstName
      lastName
      status
      # ofis, roller vb. isterseniz ekleyebilirsiniz:
      # office { officeId name ... }
      # roles { roleId name ... }
    }
  }
`;

/** Me -> Oturum açan kullanıcının bilgisi */
export const GET_ME = `
  query Me {
    me {
      userId
      email
      firstName
      lastName
      status
    }
  }
`;
