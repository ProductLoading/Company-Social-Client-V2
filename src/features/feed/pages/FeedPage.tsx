import React, { useEffect } from 'react';
import { Card, Divider, Spin, Typography } from 'antd';
import { AddPostForm } from '@/features/post/components/AddPostForm';
import { useFeed } from '../hooks';
import { FeedList } from '../components/feedList';

const { Title } = Typography;

const FeedPage: React.FC = () => {
  const { posts, loading, error, refetchFeed } = useFeed();

  useEffect(() => {
    refetchFeed();
  }, [refetchFeed]);

  if (loading) return <Spin tip="Yükleniyor..." style={{ display: 'block', marginTop: 100 }} />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem' }}>
      {/* <Title className='mb-24 bg-red-500 text-blue-400 text-xs' level={2}>📰 Ana Sayfa</Title> */}

      <Card title="Create new post" style={{ marginBottom: 32 }}>
        <AddPostForm />
      </Card>

      <Divider orientation="left">Gönderiler</Divider>

      <FeedList posts={posts} />
    </div>
  );
};

export default FeedPage;
