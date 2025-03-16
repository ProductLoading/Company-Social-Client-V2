import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Spin, message } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchUserById, updateUser } from '../userSlice';

const UserEditPage: React.FC = () => {
    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const { selectedUser, loading, error } = useAppSelector((state) => state.user);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserById(userId));
        }
    }, [dispatch, userId]);

    useEffect(() => {
        if (selectedUser) {
            form.setFieldsValue({
                userId: selectedUser.userId,
                email: selectedUser.email,
                firstName: selectedUser.firstName,
                lastName: selectedUser.lastName,
                status: selectedUser.status,
            });
        }
    }, [selectedUser, form]);

    const onFinish = async (values: any) => {
        setSaving(true);
        try {
            await dispatch(updateUser(values)).unwrap();
            message.success('User updated successfully');
            navigate('/users');
        } catch (err) {
            message.error('Failed to update user');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Spin />;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
    if (!selectedUser) return <div>No user found.</div>;

    return (
        <div>
            <h2>Edit User</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 400 }}
            >
                {/* userId, hidden or disabled field */}
                <Form.Item name="userId" label="User ID">
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, type: 'email' }]}
                >
                    <Input placeholder="user@example.com" />
                </Form.Item>

                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="John" />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="Doe" />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>

                <Button type="primary" htmlType="submit" loading={saving}>
                    Update
                </Button>
            </Form>
        </div>
    );
};

export default UserEditPage;
