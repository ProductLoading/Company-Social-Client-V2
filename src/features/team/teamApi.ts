import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryApollo } from '@/config/baseQueryApollo';
import {
  GET_TEAMS,
  GET_TEAM_BY_ID,
  CREATE_TEAM,
  UPDATE_TEAM,
  DELETE_TEAM,
  GET_USERS_FOR_TEAM,
  ADD_USER_TO_TEAM,
  REMOVE_USER_FROM_TEAM,
} from './graphql/team.queries';
import { TeamEntity, CreateTeamDto, UpdateTeamDto } from './types/team.types';
import { UserTeamEntity } from './types/userTeam.types';

export const teamApi = createApi({
  reducerPath: 'teamApi',
  baseQuery: baseQueryApollo,
  endpoints: (builder) => ({
    getTeams: builder.query<TeamEntity[], void>({
      query: () => ({ document: GET_TEAMS }),
      transformResponse: (res: any) => res.getTeams,
    }),

    getTeamById: builder.query<TeamEntity, string>({
      query: (teamId) => ({
        document: GET_TEAM_BY_ID,
        variables: { teamId },
      }),
      transformResponse: (res: any) => res.getTeamById,
    }),

    createTeam: builder.mutation<TeamEntity, CreateTeamDto>({
      query: (input) => ({
        document: CREATE_TEAM,
        variables: { input },
      }),
      transformResponse: (res: any) => res.createTeam,
    }),

    updateTeam: builder.mutation<TeamEntity, UpdateTeamDto>({
      query: (input) => ({
        document: UPDATE_TEAM,
        variables: { input },
      }),
      transformResponse: (res: any) => res.updateTeam,
    }),

    deleteTeam: builder.mutation<boolean, string>({
      query: (teamId) => ({
        document: DELETE_TEAM,
        variables: { teamId },
      }),
      transformResponse: (res: any) => res.deleteTeam,
    }),

    getUsersForTeam: builder.query<UserTeamEntity[], string>({
      query: (teamId) => ({
        document: GET_USERS_FOR_TEAM,
        variables: { teamId },
      }),
      transformResponse: (res: any) => res.getUsersForTeam,
    }),

    addUserToTeam: builder.mutation<UserTeamEntity, { userId: string; teamId: string }>({
      query: (input) => ({
        document: ADD_USER_TO_TEAM,
        variables: input,
      }),
      transformResponse: (res: any) => res.addUserToTeam,
    }),

    removeUserFromTeam: builder.mutation<boolean, { userId: string; teamId: string }>({
      query: (input) => ({
        document: REMOVE_USER_FROM_TEAM,
        variables: input,
      }),
      transformResponse: (res: any) => res.removeUserFromTeam,
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamByIdQuery,
  useCreateTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
  useGetUsersForTeamQuery,
  useAddUserToTeamMutation,
  useRemoveUserFromTeamMutation,
} = teamApi;
