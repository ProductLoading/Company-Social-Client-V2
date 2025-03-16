import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchUserById } from '../userSlice';

const UserDetailPage: React.FC = () => {
    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const { selectedUser, loading, error } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById(userId));
        }
    }, [dispatch, userId]);

    if (loading) return <Spin />;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
    if (!selectedUser) return <div>No user found.</div>;

    return (
        <div>
            <h2>User Detail</h2>
            <p><strong>ID:</strong> {selectedUser.userId}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>First Name:</strong> {selectedUser.firstName}</p>
            <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
            <p><strong>Status:</strong> {selectedUser.status}</p>
            {/* Diğer alanlar (roles, office vb.) ihtiyaca göre eklenir */}
        </div>
    );
};

export default UserDetailPage;
