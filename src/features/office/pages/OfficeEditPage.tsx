// src/features/office/pages/OfficeEditPage.tsx
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Spin, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useOfficeDetail, useOfficeActions } from '../hooks';

const OfficeEditPage: React.FC = () => {
  const { officeId } = useParams<{ officeId: string }>();
  const navigate = useNavigate();
  const { selectedOffice, loadOfficeById, loading, error } = useOfficeDetail();
  const { editOffice } = useOfficeActions();
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (officeId) {
      loadOfficeById(officeId).catch(() => {
        message.error('Failed to load office');
      });
    }
  }, [officeId]);

  useEffect(() => {
    if (selectedOffice) {
      form.setFieldsValue({
        city: selectedOffice.city,
        buildingName: selectedOffice.buildingName,
        address: selectedOffice.address,
      });
    }
  }, [selectedOffice]);

  const onFinish = async (values: any) => {
    if (!officeId) return;
    setSaving(true);
    try {
      await editOffice({ ...values, officeId });
      message.success('Office updated');
      navigate('/offices');
    } catch (err) {
      message.error('Failed to update office');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spin />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 600 }}>
      <h2>Edit Office</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="city" label="City" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="buildingName" label="BuildingName">
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address">
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={saving}>
          Update
        </Button>
      </Form>
    </div>
  );
};

export default OfficeEditPage;
