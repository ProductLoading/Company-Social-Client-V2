// src/features/office/pages/OfficeListPage.tsx
import React, { useEffect } from 'react';
import { Table, Button, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useOfficeList, useOfficeActions } from '../hooks';

const OfficeListPage: React.FC = () => {
  const navigate = useNavigate();
  const { offices, loading, error, loadOffices } = useOfficeList();
  const { deleteOffice } = useOfficeActions();

  useEffect(() => {
    loadOffices().catch(() => {
      message.error('Failed to load offices');
    });
  }, []);

  const handleDelete = async (officeId: string) => {
    if (!window.confirm('Delete this office?')) return;
    try {
      await deleteOffice(officeId);
      message.success('Office deleted');
      await loadOffices();
    } catch (err) {
      message.error('Failed to delete office');
    }
  };

  const columns = [
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'BuildingName',
      dataIndex: 'buildingName',
      key: 'buildingName',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <>
          <Button onClick={() => navigate(`/offices/${record.officeId}`)}>Detail</Button>
          <Button onClick={() => navigate(`/offices/edit/${record.officeId}`)}>Edit</Button>
          <Button danger onClick={() => handleDelete(record.officeId)}>Delete</Button>
        </>
      ),
    },
  ];

  if (loading) return <Spin />;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <div className='flex justify-between mb-20'>
        <h2 className='mb-20 text-2xl font-bold mb-20'>Office List</h2>
        <Button type="primary" onClick={() => navigate('/offices/create')}>
          Create Office
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={offices}
        rowKey="officeId"
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default OfficeListPage;
