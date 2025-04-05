// src/features/comment/components/CommentList.tsx
import React from 'react';
import { List, Card, Spin, Alert } from 'antd';
import { useComments } from '../comment.hooks'; // custom hook
import type { IComment } from '../comment.types';

interface CommentListProps {
  postId: string;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const { comments, isLoading, isError } = useComments(postId);

  if (isLoading) return <Spin tip="Yorumlar Yükleniyor..." />;
  if (isError) return <Alert type="error" message="Yorumlar yüklenirken hata oluştu" />;

  if (!comments.length) {
    return <p className="text-gray-500">Henüz yorum yok.</p>;
  }

  return (
    <List
      dataSource={comments}
      renderItem={(comment: IComment) => (
        <List.Item key={comment.id}>
          <Card className="w-full">
            <p className="font-semibold text-base mb-1">{comment.content}</p>
            {comment.files?.map((file) => (
              <div key={file.id} className="text-sm text-gray-600">
                Dosya: <a href={file.fileUrl}>{file.fileName ?? 'indir'}</a>
              </div>
            ))}
          </Card>
        </List.Item>
      )}
    />
  );
};

export default CommentList;
