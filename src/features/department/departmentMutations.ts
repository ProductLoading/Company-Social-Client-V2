// src/features/department/departmentMutations.ts
import { gql } from '@apollo/client';

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($input: CreateDepartmentInput!) {
    createDepartment(input: $input) {
      departmentId
      name
      manager {
        userId
        firstName
        lastName
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($input: UpdateDepartmentInput!) {
    updateDepartment(input: $input) {
      departmentId
      name
      manager {
        userId
        firstName
        lastName
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_DEPARTMENT = gql`
  mutation DeleteDepartment($departmentId: String!) {
    deleteDepartment(departmentId: $departmentId)
  }
`;
