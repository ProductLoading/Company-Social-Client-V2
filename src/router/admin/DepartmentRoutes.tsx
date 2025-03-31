// DepartmentRoutes.tsx
import { Route } from 'react-router-dom';
import DepartmentListPage from '@/features/department/pages/DepartmentListPage';
import DepartmentCreatePage from '@/features/department/pages/DepartmentCreatePage';
import DepartmentEditPage from '@/features/department/pages/DepartmentEditPage';
import DepartmentDetailPage from '@/features/department/pages/DepartmentDetailPage';

const DepartmentRoutes = () => {
    return (
        <>
            <Route path="departments" element={<DepartmentListPage />} />
            <Route path="departments/create" element={<DepartmentCreatePage />} />
            <Route path="departments/edit/:departmentId" element={<DepartmentEditPage />} />
            <Route path="departments/:departmentId" element={<DepartmentDetailPage />} />
        </>
    );
};

export default DepartmentRoutes;
