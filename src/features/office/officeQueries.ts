// src/features/office/officeQueries.ts
import { gql } from '@apollo/client';

export const GET_OFFICES = gql`
  query GetOffices($limit: Float, $offset: Float) {
    offices(limit: $limit, offset: $offset) {
      officeId
      city
      buildingName
      address
      createdAt
      updatedAt
    }
  }
`;

export const GET_OFFICE = gql`
  query GetOffice($officeId: String!) {
    office(officeId: $officeId) {
      officeId
      city
      buildingName
      address
      createdAt
      updatedAt
    }
  }
`;
