// src/features/department/pages/DepartmentListPage.tsx
import React, { useEffect } from 'react';
import { useDepartmentList, useDepartmentActions } from '../hooks';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const DepartmentListPage: React.FC = () => {
    const navigate = useNavigate();
    const { departments, loading, error, loadDepartments } = useDepartmentList();
    const { removeDepartment } = useDepartmentActions();

    useEffect(() => {
        loadDepartments();
    }, []);

    if (loading) return <p>Loading departments...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    const handleDelete = async (departmentId: string) => {
        if (!window.confirm('Delete this department?')) return;
        await removeDepartment(departmentId);
    };

    return (
        <div>
            <h2>Department List</h2>
            <Button type="primary" onClick={() => navigate('/departments/create')}>
                Create Department
            </Button>
            <ul style={{ marginTop: 16 }}>
                {departments.map((dept) => (
                    <li key={dept.departmentId}>
                        <b>{dept.name}</b> - Manager: {dept.manager?.firstName || 'No manager'}{' '}
                        <Button onClick={() => navigate(`/departments/${dept.departmentId}`)}>Detail</Button>
                        <Button onClick={() => navigate(`/departments/edit/${dept.departmentId}`)}>Edit</Button>
                        <Button danger onClick={() => handleDelete(dept.departmentId)}>Delete</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentListPage;
