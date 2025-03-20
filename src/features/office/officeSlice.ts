// src/features/office/officeSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apolloClient from '@/graphql/apolloClient';
import { GET_OFFICES, GET_OFFICE } from './officeQueries';
import { CREATE_OFFICE, UPDATE_OFFICE, REMOVE_OFFICE } from './officeMutations';
import type { Office, CreateOfficeInput, UpdateOfficeInput } from './types';

interface OfficeState {
    offices: Office[];
    selectedOffice: Office | null;
    loading: boolean;
    error: string | null;
}

const initialState: OfficeState = {
    offices: [],
    selectedOffice: null,
    loading: false,
    error: null,
};

// **FETCH OFFICES** (list)
export const fetchOffices = createAsyncThunk(
    'office/fetchOffices',
    async ({ limit, offset }: { limit?: number; offset?: number }) => {
        const { data } = await apolloClient.query({
            query: GET_OFFICES,
            variables: { limit, offset },
        });
        return data.offices as Office[];
    }
);

// **FETCH SINGLE OFFICE** (detail)
export const fetchOfficeById = createAsyncThunk(
    'office/fetchOfficeById',
    async (officeId: string) => {
        const { data } = await apolloClient.query({
            query: GET_OFFICE,
            variables: { officeId },
        });
        return data.office as Office;
    }
);

// **CREATE OFFICE**
export const createOffice = createAsyncThunk(
    'office/createOffice',
    async (input: CreateOfficeInput) => {
        const { data } = await apolloClient.mutate({
            mutation: CREATE_OFFICE,
            variables: { input },
        });
        return data.createOffice as Office;
    }
);

// **UPDATE OFFICE**
export const updateOffice = createAsyncThunk(
    'office/updateOffice',
    async (input: UpdateOfficeInput) => {
        const { data } = await apolloClient.mutate({
            mutation: UPDATE_OFFICE,
            variables: { input },
        });
        return data.updateOffice as Office;
    }
);

// **REMOVE OFFICE**
export const removeOffice = createAsyncThunk(
    'office/removeOffice',
    async (officeId: string) => {
        await apolloClient.mutate({
            mutation: REMOVE_OFFICE,
            variables: { officeId },
        });
        return officeId; // Dönen veri boolean, ama id'yi slice'dan ayıklamak için
    }
);

const officeSlice = createSlice({
    name: 'office',
    initialState,
    reducers: {
        clearSelectedOffice: (state) => {
            state.selectedOffice = null;
        },
    },
    extraReducers: (builder) => {
        // FETCH OFFICES
        builder.addCase(fetchOffices.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchOffices.fulfilled, (state, action) => {
            state.loading = false;
            state.offices = action.payload;
        });
        builder.addCase(fetchOffices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch offices';
        });

        // FETCH SINGLE
        builder.addCase(fetchOfficeById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchOfficeById.fulfilled, (state, action) => {
            state.loading = false;
            state.selectedOffice = action.payload;
        });
        builder.addCase(fetchOfficeById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch office';
        });

        // CREATE
        builder.addCase(createOffice.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createOffice.fulfilled, (state, action) => {
            state.loading = false;
            state.offices.push(action.payload);
        });
        builder.addCase(createOffice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to create office';
        });

        // UPDATE
        builder.addCase(updateOffice.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateOffice.fulfilled, (state, action) => {
            state.loading = false;
            const updatedOffice = action.payload;
            const idx = state.offices.findIndex(o => o.officeId === updatedOffice.officeId);
            if (idx >= 0) state.offices[idx] = updatedOffice;
            if (state.selectedOffice?.officeId === updatedOffice.officeId) {
                state.selectedOffice = updatedOffice;
            }
        });
        builder.addCase(updateOffice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to update office';
        });

        // REMOVE
        builder.addCase(removeOffice.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(removeOffice.fulfilled, (state, action) => {
            state.loading = false;
            const deletedId = action.payload;
            state.offices = state.offices.filter((o) => o.officeId !== deletedId);
        });
        builder.addCase(removeOffice.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to remove office';
        });
    },
});

export const { clearSelectedOffice } = officeSlice.actions;
export default officeSlice.reducer;
