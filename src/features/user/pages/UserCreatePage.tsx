import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAppDispatch } from '@/app/hooks';
import { registerUser } from '../userSlice';

const UserCreatePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await dispatch(registerUser(values)).unwrap();
      message.success('User registered successfully');
      form.resetFields();
    } catch (err) {
      message.error('Failed to register user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 400 }}
      >
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

        <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
          <Input placeholder="John" />
        </Form.Item>

        <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
          <Input placeholder="Doe" />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default UserCreatePage;
