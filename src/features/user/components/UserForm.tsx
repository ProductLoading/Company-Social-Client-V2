import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { User } from '../types';

interface UserFormProps {
  initialValues?: Partial<User>;
  onSubmit: (values: Partial<User>) => Promise<void>;
  submitText?: string;
}

const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  onSubmit,
  submitText = 'Submit',
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values: Partial<User>) => {
    setLoading(true);
    try {
      await onSubmit(values);
      form.resetFields();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={handleFinish}
      style={{ maxWidth: 400 }}
    >
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="password" label="Password">
        <Input.Password />
      </Form.Item>

      <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Button type="primary" htmlType="submit" loading={loading}>
        {submitText}
      </Button>
    </Form>
  );
};

export default UserForm;
