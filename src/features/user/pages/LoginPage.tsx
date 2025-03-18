// src/features/user/pages/LoginPage.tsx
import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loginUser } from '../userSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.user);
  const [form] = Form.useForm();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      await dispatch(loginUser(values)).unwrap();
      message.success('Login successful!');
      navigate('/dashboard'); // Kullanıcıyı yönlendiriyoruz (uygun rotaya)
    } catch (err) {
      message.error(err as string);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Login</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input placeholder="user@example.com" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, min: 6 }]}
        >
          <Input.Password placeholder="At least 6 characters" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default LoginPage;
