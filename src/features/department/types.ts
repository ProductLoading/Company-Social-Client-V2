// src/features/department/types.ts
export interface Department {
  departmentId: string;
  name: string;
  parentDepartment?: Department;
  subDepartments?: Department[];
  manager?: {
    userId: string;
    firstName: string;
    lastName: string;
  };
  office: {
    officeId: string;
    city: string;
    // vs. 
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDepartmentInput {
  name: string;
  parentDepartmentId?: string;
  officeId: string;
  managerId?: string;
}

export interface UpdateDepartmentInput {
  departmentId: string;
  name?: string;
  parentDepartmentId?: string;
  officeId?: string;
  managerId?: string;
}
