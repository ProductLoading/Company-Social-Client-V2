export interface TeamEntity {
    teamId: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
    manager: {
      userId: string;
      firstName: string;
      lastName: string;
    };
    department: {
      departmentId: string;
      name: string;
      office: {
        city: string;
        officeId: string;
        name: string;
      };
    };
  }
  
  export interface CreateTeamDto {
    name: string;
    description?: string;
    managerId: string;
    departmentId: string;
  }
  
  export interface UpdateTeamDto {
    teamId: string;
    name?: string;
    description?: string;
    managerId?: string;
    departmentId?: string;
  }
  