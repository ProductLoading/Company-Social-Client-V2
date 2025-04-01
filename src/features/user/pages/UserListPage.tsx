// src/features/user/pages/UserListPage.tsx
import React from 'react';
import { useUsersQuery } from '../api/userApi';
import { UserCard } from '../components/UserCard';

export default function UserListPage() {
  const { data, isLoading, isError } = useUsersQuery({ limit: 10, offset: 0 });

  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError) return <div>Bir hata oluştu!</div>;
  if (!data) return null;

  return (
    <div>
      <h2>Kullanıcı Listesi</h2>
      {data.map((user) => (
        <UserCard key={user.userId} user={user} />
      ))}
    </div>
  );
}
