// src/features/department/pages/DepartmentEditPage.tsx
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Spin, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useDepartmentDetail, useDepartmentActions } from '../hooks';

const DepartmentEditPage: React.FC = () => {
    const { departmentId } = useParams<{ departmentId: string }>();
    const navigate = useNavigate();
    const { selectedDepartment, loadDepartmentById, loading, error } = useDepartmentDetail();
    const { editDepartment } = useDepartmentActions();
    const [saving, setSaving] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (departmentId) {
            loadDepartmentById(departmentId).catch(() => {
                message.error('Failed to load department');
            });
        }
    }, [departmentId]);

    useEffect(() => {
        if (selectedDepartment) {
            form.setFieldsValue({
                name: selectedDepartment.name,
                officeId: selectedDepartment.office.officeId,
                managerId: selectedDepartment.manager?.userId,
                parentDepartmentId: selectedDepartment.parentDepartment?.departmentId,
            });
        }
    }, [selectedDepartment]);

    const onFinish = async (values: any) => {
        if (!departmentId) return;
        setSaving(true);
        try {
            await editDepartment({ ...values, departmentId });
            message.success('Department updated!');
            navigate('/departments');
        } catch (err) {
            message.error('Failed to update department');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Spin />;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!selectedDepartment) return <p>Department not found</p>;

    return (
        <div style={{ maxWidth: 600 }}>
            <h2>Edit Department</h2>
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="OfficeId" name="officeId" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Manager User ID" name="managerId">
                    <Input />
                </Form.Item>
                <Form.Item label="Parent Department ID" name="parentDepartmentId">
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={saving}>
                    Update
                </Button>
            </Form>
        </div>
    );
};

export default DepartmentEditPage;
