// src/features/department/hooks.ts
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  fetchDepartments,
  fetchDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from './departmentSlice';
import { CreateDepartmentInput, UpdateDepartmentInput } from './types';

export function useDepartmentList() {
  const dispatch = useAppDispatch();
  const { departments, loading, error } = useAppSelector((state) => state.department);

  const loadDepartments = async () => {
    await dispatch(fetchDepartments()).unwrap();
  };

  return { departments, loading, error, loadDepartments };
}

export function useDepartmentDetail() {
  const dispatch = useAppDispatch();
  const { selectedDepartment, loading, error } = useAppSelector((state) => state.department);

  const loadDepartmentById = async (departmentId: string) => {
    await dispatch(fetchDepartmentById(departmentId)).unwrap();
  };

  return { selectedDepartment, loading, error, loadDepartmentById };
}

export function useDepartmentActions() {
  const dispatch = useAppDispatch();

  const addDepartment = async (input: CreateDepartmentInput) => {
    return dispatch(createDepartment(input)).unwrap();
  };
  const editDepartment = async (input: UpdateDepartmentInput) => {
    return dispatch(updateDepartment(input)).unwrap();
  };
  const removeDepartment = async (departmentId: string) => {
    return dispatch(deleteDepartment(departmentId)).unwrap();
  };

  return { addDepartment, editDepartment, removeDepartment };
}
