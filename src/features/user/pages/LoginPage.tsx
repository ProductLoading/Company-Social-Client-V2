// src/features/user/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/users'); // Giriş başarılı -> kullanıcı listesine yönlendir
    } catch (error) {
      console.error(error);
      alert('Giriş başarısız!');
    }
  };

  return (
    <div>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>E-posta:</label>
          <input
            type="email"
            disabled={isAuthLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Şifre:</label>
          <input
            type="password"
            disabled={isAuthLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button disabled={isAuthLoading} type="submit">
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
