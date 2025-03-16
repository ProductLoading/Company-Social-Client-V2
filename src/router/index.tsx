import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/shared/components/Layout';
import UserListPage from '@/features/user/pages/UserListPage';
import UserCreatePage from '@/features/user/pages/UserCreatePage';
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
                    {/* <Route path="/posts" element={<PostListPage />} />
                    <Route path="/comments" element={<CommentListPage />} /> */}
                    {/* Diğer feature rotaları */}
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default AppRouter;
