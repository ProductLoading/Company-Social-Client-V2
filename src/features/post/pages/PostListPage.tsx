import React, { useEffect } from 'react';
import { Spin, Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchPosts } from '../postSlice';

const PostListPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // Redux Store'dan veriyi çek
  const { posts, loading, error } = useAppSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <Spin />;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>All Posts</h2>
      <Button type="primary" onClick={() => navigate('/posts/create')}>
        Create Post
      </Button>
      {posts.map((post) => (
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
