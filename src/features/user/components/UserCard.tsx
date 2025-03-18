import React from 'react';
import { Card } from 'antd';
import { User } from '../types';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      {/* <p><strong>ID:</strong> {user.userId}</p> */}
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Status:</strong> {user.status}</p>
    </Card>
  );
};

export default UserCard;
