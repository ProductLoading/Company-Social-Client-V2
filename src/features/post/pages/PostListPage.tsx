// src/features/post/pages/PostListPage.tsx
import React, { useEffect } from 'react';
import { Table, Spin } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { fetchPosts } from '../postSlice';

const PostListPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { posts, loading } = useAppSelector((state) => state.post);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const columns = [
        { title: 'Title', dataIndex: 'title', key: 'title' },
        { title: 'Content', dataIndex: 'content', key: 'content' },
        { title: 'User', dataIndex: ['user', 'firstName'], key: 'user' },
    ];

    return loading ? <Spin /> : <Table columns={columns} dataSource={posts} rowKey="id" />;
};

export default PostListPage;
