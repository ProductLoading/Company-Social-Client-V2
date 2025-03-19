// src/features/post/pages/PostDetailPage.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POST } from '../postQueries';
import { Spin, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetailPage: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_POST, {
    variables: { postId },
    skip: !postId,
  });

  if (!postId) return <p>Missing postId in route</p>;
  if (loading) return <Spin />;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

  const post = data?.getPost;
  if (!post) return <p>Post not found</p>;

  return (
    <div>
      <h2>Post Detail</h2>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>Type: {post.postType}</p>
      <p>Visibility: {post.visibilityScope}</p>
      <p>Author: {post.user.firstName} {post.user.lastName}</p>
      {post.files?.length > 0 && (
        <>
          <h4>Files:</h4>
          <ul>
            {post.files.map((file: any) => (
              <li key={file.fileId}>
                {file.filename} - <a href={file.url}>{file.url}</a>
              </li>
            ))}
          </ul>
        </>
      )}

      <Button onClick={() => navigate(`/posts/edit/${postId}`)}>Edit</Button>
      <Button danger onClick={() => navigate(`/posts/delete/${postId}`)}>
        Delete
      </Button>
    </div>
  );
};

export default PostDetailPage;
