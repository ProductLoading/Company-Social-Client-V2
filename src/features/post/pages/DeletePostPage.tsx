// src/features/post/pages/DeletePostPage.tsx
import React from 'react';
import { Modal, message } from 'antd';
import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../postMutations';
import { useNavigate, useParams } from 'react-router-dom';

const DeletePostPage: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [deletePost] = useMutation(DELETE_POST);

  const handleDelete = async () => {
    try {
      await deletePost({ variables: { postId } });
      message.success('Post deleted successfully!');
      navigate('/posts');
    } catch (err) {
      console.error(err);
      message.error('Failed to delete post');
    }
  };

  return (
    <Modal
      title="Delete Post?"
      visible={true}
      onOk={handleDelete}
      onCancel={() => navigate('/posts')}
      okText="Yes"
      cancelText="No"
    >
      <p>Are you sure you want to delete this post?</p>
    </Modal>
  );
};

export default DeletePostPage;
