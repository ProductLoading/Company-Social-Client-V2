// src/features/user/pages/MyProfilePage.tsx

import { Card, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function MyProfilePage() {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600">Bilgiler yükleniyor...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-gray-600">Giriş yapmadınız.</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-md">
        <Typography.Title level={3} className="!mb-4 !text-center">
          Profilim
        </Typography.Title>
        <div className="space-y-2 text-base">
          <p>
            <strong>Ad: </strong> {user.firstName}
          </p>
          <p>
            <strong>Soyad: </strong> {user.lastName}
          </p>
          <p>
            <strong>E-posta: </strong> {user.email}
          </p>
          <p>
            <strong>Durum: </strong> {user.status}
          </p>
        </div>

        <div className="text-center mt-6">
          <Link to="/profile/edit">
            <Button type="primary">Profili Güncelle</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
