// Örnek: src/features/post-file/PostFileUpload.tsx
import React, { useState } from 'react';
import { Button, Upload, message } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import { usePostFile } from './postFileHooks';

interface Props {
  postId: string;
}

const PostFileUpload: React.FC<Props> = ({ postId }) => {
  const { uploadFileToPost } = usePostFile();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [realFiles, setRealFiles] = useState<File[]>([]);

  const uploadProps: UploadProps = {
    multiple: true,
    beforeUpload: () => false, // manuel yapacağız
    fileList,
    onChange(info) {
      setFileList(info.fileList);
      const selected = info.fileList
        .map((f) => f.originFileObj)
        .filter(Boolean) as File[];
      setRealFiles(selected);
    },
  };

  const handleUpload = async () => {
    if (!postId || realFiles.length === 0) {
      message.warning('Select postId and file');
      return;
    }
    try {
      for (const file of realFiles) {
        await uploadFileToPost(postId, file);
      }
      message.success('Files uploaded');
      setFileList([]);
      setRealFiles([]);
    } catch (err) {
      console.error(err);
      message.error('Upload failed');
    }
  };

  return (
    <div>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Select Files</Button>
      </Upload>
      <Button onClick={handleUpload} style={{ marginTop: 8 }}>
        Upload
      </Button>
    </div>
  );
};

export default PostFileUpload;
