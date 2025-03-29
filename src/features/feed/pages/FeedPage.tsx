// features/feed/pages/FeedPage.tsx
import React, { useEffect, useState } from 'react';
import { Card, Spin, Form, Input, Select, Button, message, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import { AddPostForm } from '@/features/post/components/AddPostForm';
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
      <AddPostForm></AddPostForm>



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
