// src/features/office/types.ts
export interface Office {
    officeId: string;
    city: string;
    buildingName?: string;
    address?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface CreateOfficeInput {
    city: string;
    buildingName?: string;
    address?: string;
  }
  
  export interface UpdateOfficeInput extends CreateOfficeInput {
    officeId: string;
  }
  