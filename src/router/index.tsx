import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/shared/components/Layout';
import UserListPage from '@/features/user/pages/UserListPage';
import UserCreatePage from '@/features/user/pages/UserCreatePage';
import RegisterPage from '@/features/user/pages/RegisterPage';
import LoginPage from '@/features/user/pages/LoginPage';
import PostListPage from '@/features/post/pages/PostListPage';
import CreatePostPage from '@/features/post/pages/CreatePostPage';
import PostDetailPage from '@/features/post/pages/PostDetailPage';
import EditPostPage from '@/features/post/pages/EditPostPage';
import DeletePostPage from '@/features/post/pages/DeletePostPage';
// import CommentListPage from '@/features/comment/pages/CommentListPage';

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<div>Home Page</div>} />
                    <Route path="/users" element={<UserListPage />} />
                    <Route path="/users/create" element={<UserCreatePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="/posts" element={<PostListPage />} />
                    <Route path="/posts/create" element={<CreatePostPage />} />
                    <Route path="/posts/:postId" element={<PostDetailPage />} />
                    <Route path="/posts/edit/:postId" element={<EditPostPage />} />
                    <Route path="/posts/delete/:postId" element={<DeletePostPage />} />

                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default AppRouter;
