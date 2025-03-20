// src/features/department/types.ts
export interface Department {
    departmentId: string;
    name: string;
    manager?: {
      userId: string;
      firstName: string;
      lastName: string;
    };
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface CreateDepartmentInput {
    name: string;
    managerId?: string; // opsiyonel
  }
  
  export interface UpdateDepartmentInput extends CreateDepartmentInput {
    departmentId: string;
  }
  