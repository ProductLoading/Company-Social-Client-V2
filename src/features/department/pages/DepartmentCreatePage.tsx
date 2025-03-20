// src/features/department/pages/DepartmentCreatePage.tsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useDepartmentActions } from '../hooks';
import { useNavigate } from 'react-router-dom';

const DepartmentCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { addDepartment } = useDepartmentActions();
  const [saving, setSaving] = useState(false);

  const onFinish = async (values: any) => {
    setSaving(true);
    try {
      await addDepartment(values);
      message.success('Department created!');
      navigate('/departments');
    } catch (err) {
      message.error('Failed to create department');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>Create Department</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Department Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="officeId" label="Office ID" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="managerId" label="Manager User ID">
          <Input />
        </Form.Item>
        <Form.Item name="parentDepartmentId" label="Parent Department ID">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={saving}>
          Create
        </Button>
      </Form>
    </div>
  );
};

export default DepartmentCreatePage;
