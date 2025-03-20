// src/features/department/pages/DepartmentDetailPage.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDepartmentDetail } from '../hooks';
import { Spin, Card, Button, message } from 'antd';

const DepartmentDetailPage: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const navigate = useNavigate();
  const { selectedDepartment, loading, error, loadDepartmentById } = useDepartmentDetail();

  useEffect(() => {
    if (departmentId) {
      loadDepartmentById(departmentId).catch(() => {
        message.error('Failed to load department detail');
      });
    }
  }, [departmentId]);

  if (loading) return <Spin />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!selectedDepartment) return <p>Department not found</p>;

  return (
    <Card title={selectedDepartment.name} style={{ maxWidth: 600 }}>
      <p>
        <b>Manager:</b>{' '}
        {selectedDepartment.manager
          ? `${selectedDepartment.manager.firstName} ${selectedDepartment.manager.lastName}`
          : 'No manager'}
      </p>
      <p>
        <b>Office:</b> {selectedDepartment.office?.city}
      </p>
      {selectedDepartment.parentDepartment && (
        <p>
          <b>Parent Department:</b> {selectedDepartment.parentDepartment.name}
        </p>
      )}
      <Button onClick={() => navigate('/departments')}>Back</Button>
      <Button onClick={() => navigate(`/departments/edit/${departmentId}`)}>Edit</Button>
    </Card>
  );
};

export default DepartmentDetailPage;
