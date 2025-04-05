import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useAddComment } from '../comment.hooks';
import { CreateCommentDto } from '../comment.types';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';

interface CommentFormProps {
  userId: string;
  postId: string;
  parentCommentId?: string;
  onSuccess?: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  userId,
  postId,
  parentCommentId,
  onSuccess,
}) => {
  const [content, setContent] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { addComment, isLoading } = useAddComment();

  const handleFinish = async () => {
    if (!content.trim()) {
      message.warning('Yorum metni boş bırakılamaz!');
      return;
    }

    const files = fileList
      .map((f) => f.originFileObj as File)
      .filter((f): f is File => !!f);

    const dto: CreateCommentDto = {
      userId,
      postId,
      content,
      parentCommentId,
      files,
    };

    try {
      await addComment(dto);
      message.success('Yorum eklendi!');
      setContent('');
      setFileList([]);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      message.error('Yorum eklenemedi');
    }
  };

  const handleBeforeUpload = (file: RcFile): boolean => {
    const uploadFile: UploadFile = {
      uid: file.uid,
      name: file.name,
      status: 'done',
      originFileObj: file,
    };
    setFileList((prev) => [...prev, uploadFile]);
    return false;
  };
  

  const handleRemove = (file: UploadFile) => {
    setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <Form layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Yorumunuz">
          <Input.TextArea
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Dosyalar (opsiyonel)">
          <Upload.Dragger
            multiple
            fileList={fileList}
            beforeUpload={handleBeforeUpload}
            onRemove={handleRemove}
            showUploadList={{ showPreviewIcon: false }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p>Dosyaları sürükleyip bırakın veya tıklayın</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Yorum Ekle
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CommentForm;
