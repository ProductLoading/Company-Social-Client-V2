// src/features/department/pages/DepartmentListPage.tsx
import React, { useEffect } from 'react';
import { Table, Spin, Button, message } from 'antd';
import { useDepartmentList, useDepartmentActions } from '../hooks';
import { useNavigate } from 'react-router-dom';

const DepartmentListPage: React.FC = () => {
  const navigate = useNavigate();
  const { departments, loading, error, loadDepartments } = useDepartmentList();
  const { removeDepartment } = useDepartmentActions();

  useEffect(() => {
    loadDepartments().catch(() => message.error('Failed to load departments'));
  }, []);

  const handleDelete = async (deptId: string) => {
    if (!window.confirm('Delete this department?')) return;
    try {
      await removeDepartment(deptId);
      message.success('Department deleted!');
      await loadDepartments();
    } catch (err) {
      message.error('Failed to delete department');
    }
  };

  if (loading) return <Spin />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    {
      title: 'Office',
      key: 'office',
      render: (record: any) => record.office?.city || 'N/A',
    },
    {
      title: 'Manager',
      key: 'manager',
      render: (record: any) =>
        record.manager
          ? `${record.manager.firstName} ${record.manager.lastName}`
          : 'No manager',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => navigate(`/departments/${record.departmentId}`)}>
            Detail
          </Button>
          <Button onClick={() => navigate(`/departments/edit/${record.departmentId}`)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.departmentId)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Department List</h2>
      <Button type="primary" onClick={() => navigate('/departments/create')}>
        Create Department
      </Button>
      <Table
        columns={columns}
        dataSource={departments}
        rowKey="departmentId"
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default DepartmentListPage;
