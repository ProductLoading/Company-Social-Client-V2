import { gql } from '@apollo/client';

export const GET_OFFICES = gql`
  query GetOffices($limit: Int , $offset: Int ) {
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
