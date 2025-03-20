// src/features/office/officeMutations.ts
import { gql } from '@apollo/client';

export const CREATE_OFFICE = gql`
  mutation CreateOffice($input: CreateOfficeInput!) {
    createOffice(input: $input) {
      officeId
      city
      buildingName
      address
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_OFFICE = gql`
  mutation UpdateOffice($input: UpdateOfficeInput!) {
    updateOffice(input: $input) {
      officeId
      city
      buildingName
      address
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_OFFICE = gql`
  mutation RemoveOffice($officeId: String!) {
    removeOffice(officeId: $officeId)
  }
`;
