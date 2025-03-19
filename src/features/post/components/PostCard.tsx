// src/features/post/components/PostCard.tsx
import React from 'react';
import { Card } from 'antd';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
  onClick?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <Card
      title={post.title}
      style={{ marginBottom: 16 }}
      onClick={onClick}
    >
      <p>{post.content}</p>
      <p><strong>Type:</strong> {post.postType}</p>
      <p><strong>Visibility:</strong> {post.visibilityScope}</p>
      {post.files && post.files.length > 0 && (
        <ul>
          {post.files.map((file) => (
            <li key={file.fileId}>
              {file.filename} - <a href={file.url}>{file.url}</a>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default PostCard;
