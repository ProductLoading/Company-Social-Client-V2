import React from 'react';
import {
  Card,
  Avatar,
  Space,
  Typography,
  Tag,
  List,
  Divider
} from 'antd';
import {
  FileOutlined,
  FileImageOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { Post } from '../types';

const { Text, Title, Paragraph } = Typography;

/**
 * Dosya tipine göre ikon belirleme
 */
const getFileIcon = (mimetype: string) => {
  if (mimetype.includes('pdf')) {
    return <FilePdfOutlined style={{ color: '#d32f2f' }} />;
  }
  if (mimetype.includes('image')) {
    return <FileImageOutlined style={{ color: '#1890ff' }} />;
  }
  return <FileOutlined />;
};

/**
 * Gönderi görünürlük etiket rengi
 */
const getVisibilityColor = (scope: string) => {
  switch (scope) {
    case 'PUBLIC':
      return 'green';
    case 'PRIVATE':
      return 'red';
    case 'CUSTOM':
      return 'gold';
    default:
      return 'default';
  }
};

/**
 * Gönderi tipi etiket rengi
 */
const getPostTypeColor = (type: string) => {
  switch (type?.toLowerCase()) {
    case 'announcement':
      return 'blue';
    case 'poll':
      return 'purple';
    case 'question':
      return 'geekblue';
    default:
      return 'default';
  }
};

/**
 * Props
 */
interface FeedListProps {
  posts: Post[];
}

/**
 * FeedList Bileşeni
 */
export const FeedList: React.FC<FeedListProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <Card
          key={post.postId}
          style={{ marginBottom: 24 }}
          bodyStyle={{ padding: '16px' }}
        >
          <Space align="start" style={{ width: '100%' }}>
            {/* Kullanıcının avatar resmi yoksa varsayılan bir resim göster */}
            <Avatar size="large">
              <img
                src={
                  post.user?.avatar
                    ? `http://localhost:3000${post.user.avatar}`
                    : 'https://decisionsystemsgroup.github.io/workshop-html/img/john-doe.jpg'
                }
                alt="avatar"
              />
            </Avatar>

            <div style={{ flex: 1 }}>
              {/* Üst Bilgiler */}
              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Text strong>
                  {post.user?.firstName} {post.user?.lastName}
                </Text>
                <Text type="secondary">
                  {dayjs(post.createdAt).format('DD MMM YYYY HH:mm')}
                </Text>
              </Space>

              {/* Başlık ve İçerik */}
              <Title level={4} style={{ margin: '8px 0' }}>
                {post.title}
              </Title>
              <Paragraph>{post.content}</Paragraph>

              {/* Post Tipi ve Görünürlük */}
              <Space style={{ marginBottom: 8 }}>
                <Tag color={getPostTypeColor(post.postType)}>
                  {post.postType.toUpperCase()}
                </Tag>
                <Tag color={getVisibilityColor(post.visibilityScope)}>
                  {post.visibilityScope}
                </Tag>
              </Space>

              {/* Post Dosyaları (pdf, image vs.) */}
              {post.files && post.files.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  <Text strong>📎 Dosyalar:</Text>
                  <List
                    size="small"
                    dataSource={post.files}
                    renderItem={(file) => (
                      <List.Item style={{ paddingLeft: 0 }}>
                        {file.mimetype.startsWith('image/') ? (
                          <img
                            src={`http://localhost:3000${file.url}`}
                            alt={file.filename}
                            style={{
                              maxWidth: '100%',
                              maxHeight: 300,
                              borderRadius: 8,
                            }}
                          />
                        ) : (
                          <a
                            href={`http://localhost:3000${file.url}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Space>
                              {getFileIcon(file.mimetype)}
                              {file.filename}
                              <Text type="secondary">({file.mimetype})</Text>
                            </Space>
                          </a>
                        )}
                      </List.Item>
                    )}
                  />
                </div>
              )}

              {/* Yorumlar */}
              {post.comments && post.comments.length > 0 && (
                <>
                  <Divider />
                  <Text strong>Yorumlar ({post.comments.length}):</Text>
                  <List
                    size="small"
                    dataSource={post.comments}
                    renderItem={(comment) => (
                      <List.Item style={{ paddingLeft: 0 }}>
                        {/* Basit bir yorum yapısı */}
                        <Space align="start">
                          {/* Yorum dosyaları yoksa resim göstermeyiz, 
                              veya bir avatar koymak istersen buraya koyabilirsin.
                              Mesela: <Avatar src="..."/> */}
                          <div>
                            <Text strong>
                              {/* Gerçek kullanıcı bilgileri yoksa 'Anonim' */}
                              {comment.user?.firstName
                                ? `${comment.user.firstName} ${comment.user.lastName}`
                                : 'Kullanıcı Bilgisi Yok'}
                            </Text>
                            <Paragraph style={{ margin: '4px 0 0 0' }}>
                              {comment.content}
                            </Paragraph>
                            <Text type="secondary" style={{ fontSize: 12 }}>
                              {dayjs(comment.createdAt).format(
                                'DD MMM YYYY HH:mm'
                              )}
                            </Text>

                            {/* Yorum içindeki dosyalar */}
                            {comment.files && comment.files.length > 0 && (
                              <List
                                style={{ marginTop: 8 }}
                                size="small"
                                dataSource={comment.files}
                                renderItem={(cFile) => (
                                  <List.Item style={{ paddingLeft: 0 }}>
                                    {cFile.fileType?.startsWith('image/') ? (
                                      <img
                                        src={cFile.fileUrl}
                                        alt={cFile.fileName}
                                        style={{
                                          maxWidth: '100%',
                                          maxHeight: 200,
                                          borderRadius: 8,
                                          border: '1px solid #f0f0f0',
                                        }}
                                      />
                                    ) : (
                                      <a
                                        href={cFile.fileUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        <Space>
                                          {getFileIcon(cFile.fileType || '')}
                                          {cFile.fileName}
                                          <Text type="secondary">
                                            ({cFile.fileType})
                                          </Text>
                                        </Space>
                                      </a>
                                    )}
                                  </List.Item>
                                )}
                              />
                            )}
                          </div>
                        </Space>
                      </List.Item>
                    )}
                  />
                </>
              )}
            </div>
          </Space>
        </Card>
      ))}
    </>
  );
};
