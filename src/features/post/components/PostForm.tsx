// src/features/post/components/PostForm.tsx
import React from 'react';
import { Form, Input, Select, Button, Upload } from 'antd';

const { Option } = Select;

interface PostFormProps {
  initialValues?: any;
  onSubmit: (values: any) => void;
  loading?: boolean;
}

// Not: Dosya upload'u da eklemek istersen, 
//  "fileList" state de buraya gelebilir.
const PostForm: React.FC<PostFormProps> = ({
  initialValues,
  onSubmit,
  loading,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleFinish = (values: any) => {
    onSubmit(values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="content" label="Content" rules={[{ required: true }]}>
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item name="postType" label="Post Type" rules={[{ required: true }]}>
        <Select>
          <Option value="text">Text</Option>
          <Option value="image">Image</Option>
          <Option value="video">Video</Option>
        </Select>
      </Form.Item>

      <Form.Item name="visibilityScope" label="Visibility" rules={[{ required: true }]}>
        <Select>
          <Option value="public">Public</Option>
          <Option value="private">Private</Option>
        </Select>
      </Form.Item>

      {/* vs. Dosya upload da eklenebilir */}
      <Button type="primary" htmlType="submit" loading={loading}>
        Submit
      </Button>
    </Form>
  );
};

export default PostForm;
