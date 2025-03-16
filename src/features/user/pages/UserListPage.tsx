import React, { useEffect } from 'react';
import { Table, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchUsers } from '../userSlice';

const UserListPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const columns = [
    { title: 'ID', dataIndex: 'userId', key: 'userId' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
    { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
  ];

  if (loading) return <Spin />;
  if (error) return <div>Error: {error}</div>;

  return <Table columns={columns} dataSource={users} rowKey="userId" />;
};

export default UserListPage;
