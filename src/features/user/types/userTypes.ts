// src/features/user/types/userTypes.ts

/** Backend'teki User entity'sindeki temel alanlar */
export interface User {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    status: string;
    // office?: Office; vs. Eklemek isterseniz
  }
  
  /** Register ve Update esnasında gönderilen CreateUserInput */
  export interface CreateUserInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    officeId?: string;
    profilePictureUrl?: string;
  }
  
  /** UpdateUserInput: createUserInput’ın partial + userId */
  export interface UpdateUserInput extends Partial<CreateUserInput> {
    userId: string;
  }
  
  /** Eğer sayfalama parametreleri varsa */
  export interface UserPaginationArgs {
    limit?: number;
    offset?: number;
  }
  