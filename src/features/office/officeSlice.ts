// src/features/office/officeSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apolloClient from '@/graphql/apolloClient';
import { GET_OFFICES, GET_OFFICE } from './officeQueries';
import { CREATE_OFFICE, UPDATE_OFFICE, REMOVE_OFFICE } from './officeMutations';
import type { Office, CreateOfficeInput, UpdateOfficeInput } from './types';
import type { RootState } from '@/app/store';

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

// FETCH ALL OFFICES
export const fetchOffices = createAsyncThunk<Office[], { limit?: number; offset?: number }>(
  'office/fetchOffices',
  async ({ limit, offset }) => {
    const { data } = await apolloClient.query({
      query: GET_OFFICES,
      variables: { limit, offset },
    });
    return data.offices;
  }
);

// FETCH SINGLE OFFICE
export const fetchOfficeById = createAsyncThunk<Office, string>(
  'office/fetchOfficeById',
  async (officeId) => {
    const { data } = await apolloClient.query({
      query: GET_OFFICE,
      variables: { officeId },
    });
    return data.office;
  }
);

// CREATE OFFICE
export const createOffice = createAsyncThunk<Office, CreateOfficeInput, { state: RootState }>(
  'office/createOffice',
  async (input, { getState }) => {
    const state = getState();
    const token = state.user.token;
    const { data } = await apolloClient.mutate({
      mutation: CREATE_OFFICE,
      variables: { input },
      context: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    return data.createOffice;
  }
);

// UPDATE OFFICE
export const updateOffice = createAsyncThunk<Office, UpdateOfficeInput, { state: RootState }>(
  'office/updateOffice',
  async (input, { getState }) => {
    const state = getState();
    const token = state.user.token;
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_OFFICE,
      variables: { input },
      context: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    return data.updateOffice;
  }
);

// REMOVE OFFICE
export const removeOffice = createAsyncThunk<string, string, { state: RootState }>(
  'office/removeOffice',
  async (officeId, { getState }) => {
    const state = getState();
    const token = state.user.token;
    await apolloClient.mutate({
      mutation: REMOVE_OFFICE,
      variables: { officeId },
      context: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    return officeId;
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
    builder
      // FETCH OFFICES
      .addCase(fetchOffices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOffices.fulfilled, (state, action) => {
        state.loading = false;
        state.offices = action.payload;
      })
      .addCase(fetchOffices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch offices';
      })

      // FETCH SINGLE
      .addCase(fetchOfficeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOfficeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOffice = action.payload;
      })
      .addCase(fetchOfficeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch office';
      })

      // CREATE
      .addCase(createOffice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOffice.fulfilled, (state, action) => {
        state.loading = false;
        state.offices.push(action.payload);
      })
      .addCase(createOffice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create office';
      })

      // UPDATE
      .addCase(updateOffice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOffice.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const idx = state.offices.findIndex((o) => o.officeId === updated.officeId);
        if (idx !== -1) state.offices[idx] = updated;
        if (state.selectedOffice?.officeId === updated.officeId) {
          state.selectedOffice = updated;
        }
      })
      .addCase(updateOffice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update office';
      })

      // REMOVE
      .addCase(removeOffice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeOffice.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload;
        state.offices = state.offices.filter((o) => o.officeId !== deletedId);
      })
      .addCase(removeOffice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to remove office';
      });
  },
});

export const { clearSelectedOffice } = officeSlice.actions;
export default officeSlice.reducer;
