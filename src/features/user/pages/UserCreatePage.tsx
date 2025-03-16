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
            message.success('User created successfully');
            form.resetFields();
        } catch (error) {
            message.error('Failed to create user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Create New User</h2>
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item name="email" label="Email" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item name="firstName" label="First Name">
                    <Input />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name">
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Create
                </Button>
            </Form>
        </div>
    );
};

export default UserCreatePage;
