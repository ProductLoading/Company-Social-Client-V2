import React, { useEffect } from 'react';
import { Spin, Button, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchPostById, deletePost, clearSelectedPost } from '../postSlice';

const PostDetailPage: React.FC = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Redux Store'dan veriyi al
  const { selectedPost: post, loading, error } = useAppSelector((state) => state.post);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPostById(postId));
    }

    // 🟢 Component unmount edildiğinde `selectedPost` sıfırlansın
    return () => {
      dispatch(clearSelectedPost());
    };
  }, [dispatch, postId]);

  if (!postId) return <p>⚠️ Missing postId in route</p>;
  if (loading) return <Spin />;
  if (error) return <p style={{ color: 'red' }}>❌ Error: {error}</p>;
  if (!post) return <p>🚫 Post not found</p>;

  // Post'u silme işlemi
  const handleDelete = async () => {
    try {
      await dispatch(deletePost(postId)).unwrap();
      message.success('🗑️ Post successfully deleted!');
      navigate('/posts'); // Silindikten sonra listeye dön
    } catch (err) {
      message.error('❌ Failed to delete post');
    }
  };

  return (
    <div>
      <h2>📝 Post Detail</h2>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>📌 Type: {post.postType}</p>
      <p>👁️ Visibility: {post.visibilityScope}</p>
      {/* <p>👤 Author: {post.user?.firstName} {post.user?.lastName}</p> */}

      {Array.isArray(post.files) && post.files.length > 0 && (
        <>
          <h4>📂 Files:</h4>
          <ul>
            {post.files.map((file) => (
              <li key={file.fileId}>
                {file.filename} - <a href={file.url}>{file.url}</a>
              </li>
            ))}
          </ul>
        </>
      )}


      <Button type="primary" onClick={() => navigate(`/posts/edit/${postId}`)}>✏️ Edit</Button>
      <Button danger onClick={handleDelete}>🗑️ Delete</Button>
    </div>
  );
};

export default PostDetailPage;
