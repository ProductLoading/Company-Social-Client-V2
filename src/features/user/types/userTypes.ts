// src/features/user/types/userTypes.ts

/** Backend'deki "User" entity'sine dair temel alanlar */
export interface User {
    userId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    status?: string;
    // vb. ek alanlar
}

/** Backend'deki CreateUserInput */
export interface CreateUserInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    officeId?: string;
    profilePictureUrl?: string;
}

/** Backend'deki UpdateUserInput (Partial) */
export interface UpdateUserInput extends Partial<CreateUserInput> {
    userId: string;
}
