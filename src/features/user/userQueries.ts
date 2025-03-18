import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers($limit: Float, $offset: Float) {
    users(limit: $limit, offset: $offset) {
      userId
      email
      firstName
      lastName
      status


      office {
        officeId
        city
        buildingName
      }

      roles {
        roleId
        name
      }

      managedDepartments {
        departmentId
        name
      }

      managedTeams {
        teamId
        name
      }

      posts {
        postId
        title
        content
      }

      userTeams {
        team {
          teamId
          name
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      userId
      email
      firstName
      lastName
      status
      roles {
        roleId
        name
      }
    }
  }
`;
