import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_USERS } from './userQueries';
import { apolloClient } from '../../graphql/apolloClient';

interface UserState {
    users: any[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

// AsyncThunk örneği: GraphQL ile users çekelim
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
    const { data } = await apolloClient.query({
        query: GET_USERS,
    });
    return data.getUsers; // Backend'e göre dönen field
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Sync actions vs
    },
    extraReducers: (builder) => {
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
    },
});

export default userSlice.reducer;
