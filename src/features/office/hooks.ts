// src/features/office/hooks.ts
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  fetchOffices,
  fetchOfficeById,
  createOffice,
  updateOffice,
  removeOffice,
} from './officeSlice';
import type { CreateOfficeInput, UpdateOfficeInput } from './types';

export function useOfficeList() {
  const dispatch = useAppDispatch();
  const { offices, loading, error } = useAppSelector((state) => state.office);

  const loadOffices = async (limit?: number, offset?: number) => {
    await dispatch(fetchOffices({ limit, offset })).unwrap();
  };

  return { offices, loading, error, loadOffices };
}

export function useOfficeDetail() {
  const dispatch = useAppDispatch();
  const { selectedOffice, loading, error } = useAppSelector((state) => state.office);

  const loadOfficeById = async (officeId: string) => {
    await dispatch(fetchOfficeById(officeId)).unwrap();
  };

  return { selectedOffice, loading, error, loadOfficeById };
}

export function useOfficeActions() {
  const dispatch = useAppDispatch();

  const addOffice = async (input: CreateOfficeInput) => {
    return dispatch(createOffice(input)).unwrap();
  };
  const editOffice = async (input: UpdateOfficeInput) => {
    return dispatch(updateOffice(input)).unwrap();
  };
  const deleteOffice = async (officeId: string) => {
    return dispatch(removeOffice(officeId)).unwrap();
  };

  return { addOffice, editOffice, deleteOffice };
}
