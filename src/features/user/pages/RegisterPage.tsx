// src/features/user/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { registerUser } from '../userSlice';
import type { CreateUserInput } from '../types';

const RegisterPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector((state) => state.user);
    const [form] = Form.useForm();
    const [success, setSuccess] = useState(false);

    const onFinish = async (values: CreateUserInput) => {
        try {
            await dispatch(registerUser(values)).unwrap();
            message.success('Registered successfully!');
            setSuccess(true);
            form.resetFields();
        } catch (err) {
            message.error(err as string);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
            <h2>Register</h2>
            {success && <p style={{ color: 'green' }}>You have been registered!</p>}

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

                <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                    <Input placeholder="John" />
                </Form.Item>

                <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                    <Input placeholder="Doe" />
                </Form.Item>

                <Form.Item
                    name="officeId"
                    label="Office ID"
                    rules={[{ required: false }]}
                >
                    <Input placeholder="(optional)" />
                </Form.Item>

                <Form.Item
                    name="profilePictureUrl"
                    label="Profile Picture URL"
                    rules={[{ required: false }]}
                >
                    <Input placeholder="(optional)" />
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={loading}>
                    Register
                </Button>
            </Form>

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default RegisterPage;
