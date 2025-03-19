// src/features/post/pages/EditPostPage.tsx
import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_POST } from '../postQueries';
import { UPDATE_POST } from '../postMutations';
import { Form, Input, Select, Button, message, Spin } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

const { Option } = Select;

const EditPostPage: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data, loading: queryLoading, error } = useQuery(GET_POST, {
    variables: { postId },
    skip: !postId,
  });

  const [updatePost, { loading: mutationLoading }] = useMutation(UPDATE_POST);

  useEffect(() => {
    if (data?.getPost) {
      form.setFieldsValue({
        title: data.getPost.title,
        content: data.getPost.content,
        postType: data.getPost.postType,
        visibilityScope: data.getPost.visibilityScope,
      });
    }
  }, [data, form]);

  const onFinish = async (values: any) => {
    try {
      await updatePost({
        variables: { updatePostDto: { postId, ...values } },
      });
      message.success('Post updated successfully!');
      navigate(`/posts/${postId}`);
    } catch (err) {
      console.error(err);
      message.error('Failed to update post');
    }
  };

  if (queryLoading) return <Spin />;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2>Edit Post</h2>
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

        <Button type="primary" htmlType="submit" loading={mutationLoading}>
          Save
        </Button>
      </Form>
    </div>
  );
};

export default EditPostPage;
