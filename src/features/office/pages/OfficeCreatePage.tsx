// src/features/office/pages/OfficeCreatePage.tsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useOfficeActions } from '../hooks';

const OfficeCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const { addOffice } = useOfficeActions();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await addOffice(values);
            message.success('Office created');
            navigate('/offices');
        } catch (err) {
            message.error('Failed to create office');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 600 }}>
            <h2>Create Office</h2>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="city" label="City" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="buildingName" label="Building Name">
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Address">
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Create
                </Button>
            </Form>
        </div>
    );
};

export default OfficeCreatePage;
