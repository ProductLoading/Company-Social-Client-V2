import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apolloClient from '@/graphql/apolloClient';
import { GET_USERS, GET_USER } from './userQueries';
import { REGISTER_USER, LOGIN_USER, UPDATE_USER } from './userMutations';
import { User } from './types';

interface UserState {
  users: User[];
  selectedUser: User | null;
  token: string | null;       // JWT token
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

// Tek kullanıcıyı getir
export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (userId: string) => {
    const { data } = await apolloClient.query({
      query: GET_USER,
      variables: { userId },
    });
    return data.user;
  }
);

// Kayıt
export const registerUser = createAsyncThunk('user/registerUser', async (input: Partial<User>) => {
  const { data } = await apolloClient.mutate({
    mutation: REGISTER_USER,
    variables: { input },
  });
  // data.register -> accessToken döndürüyor
  return data.register as string;
});

// Giriş
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: { email: string; password: string }) => {
    const { data } = await apolloClient.mutate({
      mutation: LOGIN_USER,
      variables: { email, password },
    });
    // data.login -> accessToken
    localStorage.setItem('token', data.login);
    return data.login as string;
  }
);

// Kullanıcı Güncelle
export const updateUser = createAsyncThunk('user/updateUser', async (input: Partial<User>) => {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_USER,
    variables: { input },
  });
  return data.updateUser as User;
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
    // fetchUsers
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch users';
    });

    // fetchUserById
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedUser = action.payload;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch user';
    });

    // registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      // register mutation bir accessToken döndürüyor
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to register user';
    });

    // loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Login failed';
    });

    // updateUser
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      // selectedUser güncelledik
      state.selectedUser = action.payload;
      // users listesindeki veriyi de güncellemek isterseniz
      const idx = state.users.findIndex(u => u.userId === action.payload.userId);
      if (idx >= 0) {
        state.users[idx] = action.payload;
      }
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update user';
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
