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

  const loadDepartments = () => {
    dispatch(fetchDepartments());
  };

  return { departments, loading, error, loadDepartments };
}

export function useDepartmentDetail() {
  const dispatch = useAppDispatch();
  const { selectedDepartment, loading, error } = useAppSelector((state) => state.department);

  const loadDepartmentById = (departmentId: string) => {
    dispatch(fetchDepartmentById(departmentId));
  };

  return { selectedDepartment, loading, error, loadDepartmentById };
}

export function useDepartmentActions() {
  const dispatch = useAppDispatch();

  const addDepartment = (input: CreateDepartmentInput) => dispatch(createDepartment(input));
  const editDepartment = (input: UpdateDepartmentInput) => dispatch(updateDepartment(input));
  const removeDepartment = (departmentId: string) => dispatch(deleteDepartment(departmentId));

  return { addDepartment, editDepartment, removeDepartment };
}
