// src/router/ManagementRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ManagementLayout from '@/layouts/ManagementLayout';

// Office pages
import OfficeListPage from '@/features/office/pages/OfficeListPage';
import OfficeCreatePage from '@/features/office/pages/OfficeCreatePage';
import OfficeEditPage from '@/features/office/pages/OfficeEditPage';
import OfficeDetailPage from '@/features/office/pages/OfficeDetailPage';

// User pages
import UserListPage from '@/features/user/pages/UserListPage';
import UserCreatePage from '@/features/user/pages/UserCreatePage';
// vs. ...
// Department pages, Team pages, etc.

const ManagementRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/admin" element={<ManagementLayout />}>
                {/* Office */}
                <Route path="offices" element={<OfficeListPage />} />
                <Route path="offices/create" element={<OfficeCreatePage />} />
                <Route path="offices/edit/:officeId" element={<OfficeEditPage />} />
                <Route path="offices/:officeId" element={<OfficeDetailPage />} />

                {/* User */}
                <Route path="users" element={<UserListPage />} />
                <Route path="users/create" element={<UserCreatePage />} />
                {/* ... user edit, detail */}

                {/* Department */}
                {/* ...department routes */}

                {/* Team */}
                {/* ...team routes */}

                {/* vs. other modules */}
            </Route>
        </Routes>
    );
};

export default ManagementRoutes;
