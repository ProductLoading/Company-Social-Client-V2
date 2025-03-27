// features/feed/pages/FeedPage.tsx
import React, { useEffect, useState } from 'react';
import { Card, Spin, Form, Input, Select, Button, message, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';

import { useFeed } from '../hooks';
import type { CreatePostInput } from '../types';

const FeedPage: React.FC = () => {
  const { posts, loading, error, refetchFeed, addPost, addFileToPost } = useFeed();
  const [form] = Form.useForm();

  // AntD Upload bileşeni için görsel file listesi
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);
  // GraphQL'e göndereceğimiz gerçek File nesneleri
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  // Post oluştururken eklenecek fileId array
  const [fileIds, setFileIds] = useState<string[]>([]);

  useEffect(() => {
    // Feed'i ilk başta çek
    refetchFeed();
  }, [refetchFeed]);

  // AntD Upload için config
  const uploadProps: UploadProps = {
    multiple: true,
    beforeUpload: () => false, // otomatik yüklemeyi kapat, manuel yapacağız
    fileList: uploadFileList,
    onChange(info) {
      setUploadFileList(info.fileList);
      const realFiles = info.fileList
        .map((item) => item.originFileObj)
        .filter(Boolean) as File[];
      setSelectedFiles(realFiles);
    },
  };

  // Mevcut bir post'a dosya yükleme
  const handleUploadFiles = async () => {
    const postIdInput = (document.getElementById('postId-input') as HTMLInputElement)?.value;
    if (!postIdInput) {
      message.warning('Please enter a valid postId!');
      return;
    }
    if (!selectedFiles.length) {
      message.warning('No files selected');
      return;
    }
    try {
      for (const file of selectedFiles) {
        await addFileToPost(postIdInput, file);
      }
      message.success(`Files uploaded to postId=${postIdInput}`);
      setUploadFileList([]);
      setSelectedFiles([]);
    } catch (err) {
      console.error(err);
      message.error('Failed to upload files');
    }
  };

  // Yeni post oluşturma (fileIds vs. alarak)
  const onFinish = async (values: any) => {
    const input: CreatePostInput = {
      title: values.title,
      content: values.content,
      postType: values.postType,
      visibilityScope: values.visibilityScope,
      fileIds,
      departmentIds: values.departmentIds
        ? values.departmentIds.split(',').map((s: string) => s.trim())
        : [],
      teamIds: values.teamIds
        ? values.teamIds.split(',').map((s: string) => s.trim())
        : [],
      officeIds: values.officeIds
        ? values.officeIds.split(',').map((s: string) => s.trim())
        : [],
    };

    try {
      const newPost = await addPost(input);
      if (newPost) {
        message.success(`Post created (postId=${newPost.postId})`);
      }
      form.resetFields();
      setFileIds([]);
    } catch (err) {
      console.error(err);
      message.error('Failed to create post');
    }
  };

  // Loading / Error
  if (loading) return <Spin />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <h2>Feed Page</h2>

      {/* Dosya yükleme bölümü */}
      <Card title="Upload Files to an existing Post" style={{ marginBottom: 24 }}>
        <Input
          id="postId-input"
          placeholder="Enter existing postId"
          style={{ marginBottom: 8 }}
        />
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Select Files</Button>
        </Upload>
        <Button style={{ marginTop: 8 }} onClick={handleUploadFiles}>
          Upload to that Post
        </Button>
      </Card>

      {/* Yeni post oluşturma bölümü */}
      <Card title="Create New Post" style={{ marginBottom: 24 }}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="content" label="Content" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="postType" label="Post Type" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="text">Text</Select.Option>
              <Select.Option value="poll">Poll</Select.Option>
              <Select.Option value="event">Event</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="visibilityScope" label="Visibility Scope" rules={[{ required: true }]}>
            <Select>
              <Select.Option value="public">Public</Select.Option>
              <Select.Option value="office">Office</Select.Option>
              <Select.Option value="department">Department</Select.Option>
              <Select.Option value="team">Team</Select.Option>
            </Select>
          </Form.Item>

          {/* Manual fileIds girmek istersen */}
          <Form.Item label="File IDs (comma)">
            <Input
              onChange={(e) => {
                const arr = e.target.value
                  ? e.target.value.split(',').map((s) => s.trim())
                  : [];
                setFileIds(arr);
              }}
            />
          </Form.Item>

          <Form.Item name="departmentIds" label="Department IDs (comma)">
            <Input />
          </Form.Item>
          <Form.Item name="teamIds" label="Team IDs (comma)">
            <Input />
          </Form.Item>
          <Form.Item name="officeIds" label="Office IDs (comma)">
            <Input />
          </Form.Item>

          <Button htmlType="submit" type="primary">
            Create Post
          </Button>
        </Form>
      </Card>

      {/* Mevcut feed listesi */}
      <h3>Posts in Feed:</h3>
      {posts.map((p) => (
        <Card key={p.postId} title={p.title} style={{ marginBottom: 16 }}>
          <p>{p.content}</p>
          <p>
            <strong>Author:</strong> {p.user?.firstName} {p.user?.lastName}
          </p>
          {p.files && p.files.length > 0 && (
            <ul>
              {p.files.map((f) => (
                <li key={f.fileId}>
                  <a href={f.url} target="_blank" rel="noreferrer">
                    {f.filename}
                  </a>{' '}
                  ({f.mimetype})
                </li>
              ))}
            </ul>
          )}
        </Card>
      ))}
    </div>
  );
};

export default FeedPage;
