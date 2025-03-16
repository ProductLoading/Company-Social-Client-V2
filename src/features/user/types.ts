export interface User {
    userId: string;
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    status?: string;
    roles?: {
      roleId: string;
      name: string;
    }[];
    // office?: Office; // vs. Diğer ilişkilere göre ekleyebilirsiniz
  }
  