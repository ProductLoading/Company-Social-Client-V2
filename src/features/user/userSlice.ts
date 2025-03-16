import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apolloClient from '@/graphql/apolloClient';
import { GET_USERS, GET_USER } from './userQueries';
import { REGISTER_USER, LOGIN_USER, UPDATE_USER } from './userMutations';
import { User } from './types';

interface UserState {
  users: User[];
  selectedUser: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

// Kullanıcıları getir
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const { data } = await apolloClient.query({ query: GET_USERS });
  return data.users;
});

// Kullanıcı detayını getir
export const fetchUserById = createAsyncThunk('user/fetchUserById', async (userId: string) => {
  const { data } = await apolloClient.query({ query: GET_USER, variables: { userId } });
  return data.user;
});

// Kullanıcı Kaydı
export const registerUser = createAsyncThunk('user/registerUser', async (input: Partial<User>) => {
  const { data } = await apolloClient.mutate({
    mutation: REGISTER_USER,
    variables: { input },
  });
  return data.register;
});

// Giriş Yap
export const loginUser = createAsyncThunk('user/loginUser', async ({ email, password }: { email: string, password: string }) => {
  const { data } = await apolloClient.mutate({
    mutation: LOGIN_USER,
    variables: { email, password },
  });
  localStorage.setItem('token', data.login);
  return data.login;
});

// Kullanıcıyı Güncelle
export const updateUser = createAsyncThunk('user/updateUser', async (input: Partial<User>) => {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_USER,
    variables: { input },
  });
  return data.updateUser;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.token = action.payload;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
