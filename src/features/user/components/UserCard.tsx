// src/features/user/components/UserCard.tsx
import React from 'react';
import type { User } from '../types/userTypes';

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div style={{ border: '1px solid #eee', padding: '8px', margin: '4px 0' }}>
      <div><strong>ID:</strong> {user.userId}</div>
      <div><strong>Ad:</strong> {user.firstName}</div>
      <div><strong>Soyad:</strong> {user.lastName}</div>
      <div><strong>E-posta:</strong> {user.email}</div>
    </div>
  );
};
