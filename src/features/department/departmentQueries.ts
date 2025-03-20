// src/features/department/departmentQueries.ts
import { gql } from '@apollo/client';

export const GET_DEPARTMENTS = gql`
  query GetDepartments {
    departments {
      departmentId
      name
      parentDepartment {
        departmentId
        name
      }
      manager {
        userId
        firstName
        lastName
      }
      office {
        officeId
        city
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_DEPARTMENT = gql`
  query GetDepartment($departmentId: String!) {
    department(departmentId: $departmentId) {
      departmentId
      name
      parentDepartment {
        departmentId
        name
      }
      manager {
        userId
        firstName
        lastName
      }
      office {
        officeId
        city
      }
      createdAt
      updatedAt
    }
  }
`;
