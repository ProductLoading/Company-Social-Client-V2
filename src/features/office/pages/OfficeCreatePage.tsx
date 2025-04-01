import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useOfficeActions } from '../hooks';

const OfficeCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const { addOffice } = useOfficeActions();
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(true);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            await addOffice(values);
            message.success('Office created');
            setIsModalVisible(false);
            navigate('/offices');
        } catch (err) {
            message.error('Failed to create office');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        navigate('/offices');
    };

    return (
        <Modal
            title="Create Office"
            visible={isModalVisible}
            onCancel={handleCancel}
            footer={null}
        >
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="city" label="City" rules={[{ required: true, message: 'City is required' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="buildingName" label="Building Name">
                    <Input />
                </Form.Item>
                <Form.Item name="address" label="Address">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default OfficeCreatePage;
