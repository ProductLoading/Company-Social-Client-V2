// src/features/office/hooks.ts
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/app/store';
import {
    fetchOffices,
    fetchOfficeById,
    createOffice,
    updateOffice,
    removeOffice,
} from './officeSlice';
import type { CreateOfficeInput, UpdateOfficeInput } from './types';

export function useOfficeList() {
    const dispatch = useDispatch();
    const { offices, loading, error } = useSelector((state: RootState) => state.office);

    const loadOffices = (limit?: number, offset?: number) => {
        dispatch(fetchOffices({ limit, offset }));
    };

    return {
        offices,
        loading,
        error,
        loadOffices,
    };
}

export function useOfficeDetail() {
    const dispatch = useDispatch();
    const { selectedOffice, loading, error } = useSelector(
        (state: RootState) => state.office
    );

    const loadOfficeById = (officeId: string) => {
        dispatch(fetchOfficeById(officeId));
    };

    return {
        selectedOffice,
        loading,
        error,
        loadOfficeById,
    };
}

export function useOfficeActions() {
    const dispatch = useDispatch();

    const addOffice = (input: CreateOfficeInput) => dispatch(createOffice(input));
    const editOffice = (input: UpdateOfficeInput) => dispatch(updateOffice(input));
    const deleteOffice = (officeId: string) => dispatch(removeOffice(officeId));

    return {
        addOffice,
        editOffice,
        deleteOffice,
    };
}
