import { gql } from '@apollo/client';

export const GET_TEAMS = gql`
  query GetTeams {
    getTeams {
      teamId
      name
      description
      createdAt
      updatedAt
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
          city
        }
      }
    }
  }
`;

export const GET_TEAM_BY_ID = gql`
  query GetTeamById($teamId: String!) {
    getTeamById(teamId: $teamId) {
      teamId
      name
      description
      createdAt
      updatedAt
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
          city
        }
      }
    }
  }
`;

export const CREATE_TEAM = gql`
  mutation CreateTeam($input: CreateTeamInput!) {
    createTeam(input: $input) {
      teamId
      name
    }
  }
`;

export const UPDATE_TEAM = gql`
  mutation UpdateTeam($input: UpdateTeamInput!) {
    updateTeam(input: $input) {
      teamId
      name
      description
    }
  }
`;

export const DELETE_TEAM = gql`
  mutation DeleteTeam($teamId: String!) {
    deleteTeam(teamId: $teamId)
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
