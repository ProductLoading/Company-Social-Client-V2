// src/features/post/pages/CreatePostPage.tsx
import React, { useState } from 'react';
import { Form, Input, Select, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/es/upload';
import { useMutation } from '@apollo/client';
import { CREATE_POST } from '../postMutations';
import type { CreatePostInput } from '../types';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<RcFile[]>([]);

  const [createPost, { loading }] = useMutation(CREATE_POST);

  const onFinish = async (values: any) => {
    try {
      const input: CreatePostInput = {
        ...values,
        files: fileList, // Dosyalar opsiyonel, eğer yoksa boş array
      };

      await createPost({
        variables: { createPostDto: input },
      });

      message.success('Post created successfully!');
      navigate('/posts');
    } catch (err) {
      console.error(err);
      message.error('Failed to create post');
    }
  };

  // antd Upload: 
  const beforeUpload = (file: RcFile) => {
    setFileList((prev) => [...prev, file]);
    return false; // dosya otomatik upload olmasın
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2>Create New Post</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
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

        <Form.Item name="userId" label="User ID" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {/* Upload alanı (opsiyonel) */}
        <Form.Item label="Files (Optional)">
          <Upload
            multiple
            beforeUpload={beforeUpload}
            fileList={[]} 
            listType="text"
          >
            <Button icon={<UploadOutlined />}>Select File(s)</Button>
          </Upload>
          {fileList.length > 0 && <p>{fileList.length} file(s) selected</p>}
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>Create</Button>
      </Form>
    </div>
  );
};

export default CreatePostPage;
