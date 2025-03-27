import React, { useState } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { Upload, Button, Input, message } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';

// 1) QUERY: Post'un dosyalarını al (isteğe bağlı)
const GET_FILES_BY_POST = gql`
  query FilesByPost($postId: String!) {
    filesByPost(postId: $postId) {
      fileId
      filename
      mimetype
      url
    }
  }
`;

// 2) MUTATION: Dosya yükleme
const UPLOAD_FILE_TO_POST = gql`
  mutation UploadFileToPost($postId: String!, $file: Upload!) {
    uploadPostFile(postId: $postId, file: $file) {
      fileId
      filename
      mimetype
      url
    }
  }
`;

const PostFilePage: React.FC = () => {
  // Post ID
  const [postId, setPostId] = useState('');
  // Gelen dosyalar
  const [postFiles, setPostFiles] = useState<any[]>([]);

  // Ant Design Upload kontrolü
  const [uploadFileList, setUploadFileList] = useState<UploadFile[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Dosya listesini getirmek için (lazy query)
  const [loadFiles, { loading: loadingFiles }] = useLazyQuery(GET_FILES_BY_POST, {
    onCompleted: (data) => {
      setPostFiles(data?.filesByPost ?? []);
    },
    fetchPolicy: 'network-only',
  });

  // Dosya upload mutation
  const [uploadFileMutation, { loading: uploading }] = useMutation(UPLOAD_FILE_TO_POST);

  // Dosyaları yükle
  const handleUpload = async () => {
    if (!postId || selectedFiles.length === 0) {
      message.warning('Enter a Post ID and select file(s) first!');
      return;
    }
    try {
      // Her seçilen dosyayı tek tek yükle
      for (const file of selectedFiles) {
        const res = await uploadFileMutation({
          variables: {
            postId,
            file, // ✅ Burada file = originFileObj (aşağıda tanımladık)
          },
        });
        const uploaded = res.data?.uploadPostFile;
        if (uploaded) {
          setPostFiles((prev) => [...prev, uploaded]);
        }
      }
      message.success('Files uploaded successfully!');
      setUploadFileList([]);
      setSelectedFiles([]);
    } catch (err) {
      console.error(err);
      message.error('File upload failed');
    }
  };

  // AntD Upload konfigurasyonu
  const uploadProps: UploadProps = {
    multiple: true,
    beforeUpload: () => false, // otomatik upload kapalı
    fileList: uploadFileList,
    onChange(info) {
      // UI gösterimi için
      setUploadFileList(info.fileList);
      // Gerçek File nesnelerini çek
      const realFiles = info.fileList
        .map((f) => f.originFileObj)
        .filter(Boolean) as File[];
      setSelectedFiles(realFiles);
    },
  };

  // Post ID girip dosyaları listeleme
  const handleLoadFiles = () => {
    if (!postId) {
      message.warning('Enter a Post ID first!');
      return;
    }
    loadFiles({ variables: { postId } });
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Post File Page</h2>

      <Input
        placeholder="Enter Post ID"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <Button onClick={handleLoadFiles} loading={loadingFiles}>
        Load Files
      </Button>

      <div style={{ margin: '16px 0' }}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Select Files</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          loading={uploading}
          style={{ marginTop: 8 }}
        >
          Upload to Post
        </Button>
      </div>

      <h3>Post Files:</h3>
      {postFiles.map((f) => (
        <div key={f.fileId}>
          <a href={f.url} target="_blank" rel="noreferrer">
            {f.filename}
          </a>{' '}
          ({f.mimetype})
        </div>
      ))}
    </div>
  );
};

export default PostFilePage;
