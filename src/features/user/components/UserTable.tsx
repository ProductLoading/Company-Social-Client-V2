import React from 'react';
import { Table } from 'antd';
import { User } from '../types';

interface UserTableProps {
    users: User[];
    loading?: boolean;
}

const UserTable: React.FC<UserTableProps> = ({ users, loading = false }) => {
    const columns = [
        { title: 'ID', dataIndex: 'userId', key: 'userId' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
        { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
    ];

    return (
        <Table
            columns={columns}
            dataSource={users}
            rowKey="userId"
            loading={loading}
        />
    );
};

export default UserTable;
