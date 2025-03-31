import { gql } from '@apollo/client';

export const GET_TEAMS_FOR_USER = gql`
  query GetTeamsForUser($userId: String!) {
    getTeamsForUser(userId: $userId) {
      id
      joinedAt
      team {
        teamId
        name
        description
        manager {
          userId
          firstName
          lastName
        }
        department {
          departmentId
          name
          office {
            officeId
            name
          }
        }
      }
    }
  }
`;

export const GET_USERS_FOR_TEAM = gql`
  query GetUsersForTeam($teamId: String!) {
    getUsersForTeam(teamId: $teamId) {
      id
      joinedAt
      user {
        userId
        firstName
        lastName
        email
      }
    }
  }
`;

export const ADD_USER_TO_TEAM = gql`
  mutation AddUserToTeam($userId: String!, $teamId: String!) {
    addUserToTeam(userId: $userId, teamId: $teamId) {
      id
      joinedAt
    }
  }
`;

export const REMOVE_USER_FROM_TEAM = gql`
  mutation RemoveUserFromTeam($userId: String!, $teamId: String!) {
    removeUserFromTeam(userId: $userId, teamId: $teamId)
  }
`;
