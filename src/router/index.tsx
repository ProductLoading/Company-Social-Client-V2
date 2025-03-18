import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/shared/components/Layout';
import UserListPage from '@/features/user/pages/UserListPage';
import UserCreatePage from '@/features/user/pages/UserCreatePage';
import RegisterPage from '@/features/user/pages/RegisterPage';
import LoginPage from '@/features/user/pages/LoginPage';
// import PostListPage from '@/features/post/pages/PostListPage';
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

                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default AppRouter;
