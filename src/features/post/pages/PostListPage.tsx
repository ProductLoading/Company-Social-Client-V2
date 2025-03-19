// src/features/post/pages/PostListPage.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POSTS } from '../postQueries';
import { Spin, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const PostListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_POSTS);

  if (loading) return <Spin />;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

  const posts = data?.getPosts || [];

  return (
    <div>
      <h2>All Posts</h2>
      <Button type="primary" onClick={() => navigate('/posts/create')}>
        Create Post
      </Button>
      {posts.map((post: any) => (
        <Card
          key={post.postId}
          style={{ marginTop: 16 }}
          title={post.title}
          onClick={() => navigate(`/posts/${post.postId}`)}
        >
          <p>{post.content}</p>
        </Card>
      ))}
    </div>
  );
};

export default PostListPage;
