import React from 'react';
import {
    Card,
    Avatar,
    Space,
    Typography,
    Tag,
    List,
} from 'antd';
import {
    FileOutlined,
    FileImageOutlined,
    FilePdfOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { Post } from '../types'; // dosya yolu senin projene göre değişebilir


interface FeedListProps {
    posts: Post[];
}

const { Text, Title, Paragraph } = Typography;

const getFileIcon = (mimetype: string) => {
    if (mimetype.includes('pdf')) return <FilePdfOutlined style={{ color: '#d32f2f' }} />;
    if (mimetype.includes('image')) return <FileImageOutlined style={{ color: '#1890ff' }} />;
    return <FileOutlined />;
};

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

const getPostTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
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

export const FeedList: React.FC<FeedListProps> = ({ posts }) => {
    return (
        <>
            {posts.map((post) => (
                <Card key={post.postId} style={{ marginBottom: 24 }}>
                    <Space align="start" style={{ width: '100%' }}>
                        <Avatar size="large">
                           <img src="https://decisionsystemsgroup.github.io/workshop-html/img/john-doe.jpg" alt="" />
                        </Avatar>
                    
                        <div style={{ flex: 1 }}>
                            <Space style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <Text strong>
                                    {post.user?.firstName} {post.user?.lastName}
                                </Text>
                                <Text type="secondary">{dayjs(post.createdAt).format('DD MMM YYYY HH:mm')}</Text>
                            </Space>

                            <Title level={4} style={{ margin: '8px 0' }}>{post.title}</Title>
                            <Paragraph>{post.content}</Paragraph>

                            <Space style={{ marginBottom: 8 }}>
                                <Tag color={getPostTypeColor(post.postType)}>{post.postType.toUpperCase()}</Tag>
                                <Tag color={getVisibilityColor(post.visibilityScope)}>{post.visibilityScope}</Tag>
                            </Space>

                            {post?.files && post?.files?.length > 0 && (
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
                                                        style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8 }}
                                                    />
                                                ) : (
                                                    <a href={`http://localhost:3000${file.url}`} target="_blank" rel="noreferrer">
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
                        </div>
                    </Space>
                </Card>
            ))}
        </> 
    );
};
