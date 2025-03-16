import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { loginUser } from '../userSlice';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await dispatch(loginUser(values)).unwrap();
      message.success('Login successful');
      navigate('/users'); // Örn. user listesine yönlendirebilirsiniz
    } catch (err) {
      message.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Login</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
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
          <Input.Password />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
