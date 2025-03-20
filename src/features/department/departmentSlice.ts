// src/features/department/departmentSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apolloClient from '@/graphql/apolloClient';
import { GET_DEPARTMENTS, GET_DEPARTMENT } from './departmentQueries';
import { CREATE_DEPARTMENT, UPDATE_DEPARTMENT, DELETE_DEPARTMENT } from './departmentMutations';
import { RootState } from '@/app/store';
import type { Department, CreateDepartmentInput, UpdateDepartmentInput } from './types';

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

// **FETCH ALL DEPARTMENTS**
export const fetchDepartments = createAsyncThunk('department/fetchDepartments', async () => {
  const { data } = await apolloClient.query({ query: GET_DEPARTMENTS });
  return data.departments as Department[];
});

// **FETCH SINGLE DEPARTMENT**
export const fetchDepartmentById = createAsyncThunk(
  'department/fetchDepartmentById',
  async (departmentId: string) => {
    const { data } = await apolloClient.query({
      query: GET_DEPARTMENT,
      variables: { departmentId },
    });
    return data.department as Department;
  }
);

// **CREATE DEPARTMENT**
export const createDepartment = createAsyncThunk(
  'department/createDepartment',
  async (input: CreateDepartmentInput, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.token; // token
    const { data } = await apolloClient.mutate({
      mutation: CREATE_DEPARTMENT,
      variables: { input },
      context: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    return data.createDepartment as Department;
  }
);

// **UPDATE DEPARTMENT**
export const updateDepartment = createAsyncThunk(
  'department/updateDepartment',
  async (input: UpdateDepartmentInput, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.token;
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_DEPARTMENT,
      variables: { input },
      context: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    return data.updateDepartment as Department;
  }
);

// **DELETE DEPARTMENT**
export const deleteDepartment = createAsyncThunk(
  'department/deleteDepartment',
  async (departmentId: string, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.token;
    await apolloClient.mutate({
      mutation: DELETE_DEPARTMENT,
      variables: { departmentId },
      context: {
        headers: { Authorization: `Bearer ${token}` },
      },
    });
    return departmentId;
  }
);

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    clearSelectedDepartment(state) {
      state.selectedDepartment = null;
    },
  },
  extraReducers: (builder) => {
    // fetch
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
    // fetchById
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
    // create
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
    // update
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
      if (idx !== -1) state.departments[idx] = updated;
      if (state.selectedDepartment?.departmentId === updated.departmentId) {
        state.selectedDepartment = updated;
      }
    });
    builder.addCase(updateDepartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to update department';
    });
    // delete
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
