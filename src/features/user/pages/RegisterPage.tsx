// src/features/user/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    officeId: '',
    profilePictureUrl: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Kayıt başarılı!');
      navigate('/users');
    } catch (error) {
      console.error(error);
      alert('Kayıt başarısız!');
    }
  };

  return (
    <div>
      <h2>Kayıt Ol</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>E-posta</label>
          <input
            name="email"
            type="email"
            disabled={isLoading}
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Şifre</label>
          <input
            name="password"
            type="password"
            disabled={isLoading}
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Ad</label>
          <input
            name="firstName"
            disabled={isLoading}
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Soyad</label>
          <input
            name="lastName"
            disabled={isLoading}
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Office ID (opsiyonel)</label>
          <input
            name="officeId"
            disabled={isLoading}
            value={formData.officeId}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Profil Resmi URL (opsiyonel)</label>
          <input
            name="profilePictureUrl"
            disabled={isLoading}
            value={formData.profilePictureUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}
