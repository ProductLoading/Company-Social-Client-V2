// src/features/department/departmentSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apolloClient from '@/graphql/apolloClient';
import { GET_DEPARTMENTS, GET_DEPARTMENT } from './departmentQueries';
import { CREATE_DEPARTMENT, UPDATE_DEPARTMENT, DELETE_DEPARTMENT } from './departmentMutations';
import type { Department, CreateDepartmentInput, UpdateDepartmentInput } from './types';
import type { RootState } from '@/app/store';

interface DepartmentState {
  departments: Department[];
  selectedDepartment: Department | null;
  loading: boolean;
  error: string | null;
}

const initialState: DepartmentState = {
  departments: [],
  selectedDepartment: null,
  loading: false,
  error: null,
};

// FETCH ALL
export const fetchDepartments = createAsyncThunk<Department[]>(
  'department/fetchDepartments',
  async () => {
    const { data } = await apolloClient.query({ query: GET_DEPARTMENTS });
    return data.departments;
  }
);

// FETCH SINGLE
export const fetchDepartmentById = createAsyncThunk<Department, string>(
  'department/fetchDepartmentById',
  async (departmentId) => {
    const { data } = await apolloClient.query({
      query: GET_DEPARTMENT,
      variables: { departmentId },
    });
    return data.department;
  }
);

// CREATE
export const createDepartment = createAsyncThunk<
  Department,
  CreateDepartmentInput,
  { state: RootState }
>(
  'department/createDepartment',
  async (input, { getState }) => {
    const state = getState();
    const token = state.user.token;
    const { data } = await apolloClient.mutate({
      mutation: CREATE_DEPARTMENT,
      variables: { input },
      context: { headers: { Authorization: `Bearer ${token}` } },
    });
    return data.createDepartment;
  }
);

// UPDATE
export const updateDepartment = createAsyncThunk<
  Department,
  UpdateDepartmentInput,
  { state: RootState }
>(
  'department/updateDepartment',
  async (input, { getState }) => {
    const state = getState();
    const token = state.user.token;
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_DEPARTMENT,
      variables: { input },
      context: { headers: { Authorization: `Bearer ${token}` } },
    });
    return data.updateDepartment;
  }
);

// DELETE
export const deleteDepartment = createAsyncThunk<string, string, { state: RootState }>(
  'department/deleteDepartment',
  async (departmentId, { getState }) => {
    const token = getState().user.token;
    await apolloClient.mutate({
      mutation: DELETE_DEPARTMENT,
      variables: { departmentId },
      context: { headers: { Authorization: `Bearer ${token}` } },
    });
    return departmentId;
  }
);

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    clearSelectedDepartment: (state) => {
      state.selectedDepartment = null;
    },
  },
  extraReducers: (builder) => {
    // FETCH ALL
    builder.addCase(fetchDepartments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDepartments.fulfilled, (state, action) => {
      state.loading = false;
      state.departments = action.payload;
    });
    builder.addCase(fetchDepartments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch departments';
    });

    // FETCH SINGLE
    builder.addCase(fetchDepartmentById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDepartmentById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedDepartment = action.payload;
    });
    builder.addCase(fetchDepartmentById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch department';
    });

    // CREATE
    builder.addCase(createDepartment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createDepartment.fulfilled, (state, action) => {
      state.loading = false;
      state.departments.push(action.payload);
    });
    builder.addCase(createDepartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to create department';
    });

    // UPDATE
    builder.addCase(updateDepartment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateDepartment.fulfilled, (state, action) => {
      state.loading = false;
      const updated = action.payload;
      const idx = state.departments.findIndex(
        (d) => d.departmentId === updated.departmentId
      );
      if (idx !== -1) {
        state.departments[idx] = updated;
      }
      if (state.selectedDepartment?.departmentId === updated.departmentId) {
        state.selectedDepartment = updated;
      }
    });
    builder.addCase(updateDepartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update department';
    });

    // DELETE
    builder.addCase(deleteDepartment.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteDepartment.fulfilled, (state, action) => {
      state.loading = false;
      const deletedId = action.payload;
      state.departments = state.departments.filter(
        (d) => d.departmentId !== deletedId
      );
    });
    builder.addCase(deleteDepartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to delete department';
    });
  },
});

export const { clearSelectedDepartment } = departmentSlice.actions;
export default departmentSlice.reducer;
