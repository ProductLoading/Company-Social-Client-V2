import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DepartmentListPage from '@/features/department/pages/DepartmentListPage';
import DepartmentCreatePage from '@/features/department/pages/DepartmentCreatePage';
import DepartmentEditPage from '@/features/department/pages/DepartmentEditPage';
import DepartmentDetailPage from '@/features/department/pages/DepartmentDetailPage';

const DepartmentRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<DepartmentListPage />} />
            <Route path="/create" element={<DepartmentCreatePage />} />
            <Route path="/edit/:departmentId" element={<DepartmentEditPage />} />
            <Route path="/:departmentId" element={<DepartmentDetailPage />} />
        </Routes>
    );
};

export default DepartmentRoutes;
