import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/shared/components/Layout';
import UserListPage from '@/features/user/pages/UserListPage';
import UserCreatePage from '@/features/user/pages/RegisterPage';
import RegisterPage from '@/features/user/pages/RegisterPage';
import LoginPage from '@/features/user/pages/LoginPage';
// import PostListPage from '@/features/post/pages/PostListPage';
// import CreatePostPage from '@/features/post/pages/CreatePostPage';
// import PostDetailPage from '@/features/post/pages/PostDetailPage';
// import EditPostPage from '@/features/post/pages/EditPostPage';
// import DeletePostPage from '@/features/post/pages/DeletePostPage';
import OfficeListPage from '@/features/office/pages/OfficeListPage';
import OfficeCreatePage from '@/features/office/pages/OfficeCreatePage';
import OfficeEditPage from '@/features/office/pages/OfficeEditPage';
import OfficeDetailPage from '@/features/office/pages/OfficeDetailPage';
import ManagementRoutes from './ManagementRoutes';
import DepartmentRoutes from './admin/DepartmentRoutes';
import FeedPage from '@/features/feed/pages/FeedPage';
import PostFilePage from '@/features/post-file/PostFilePage';
import { PostCreatePage } from '@/features/post/pages/postCreatePage';
// import CommentListPage from '@/features/comment/pages/CommentListPage';
import MyProfilePage from '@/features/user/pages/MyProfilePage';



const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>

                    {/* Profile */}
                    <Route path='/profile' element={<MyProfilePage />} />
                    {/* Feed */}
                    <Route path="/feed" element={<FeedPage />} />
                    <Route path="/postfile" element={<PostFilePage />} />

                    {/* User */}
                    <Route path="/" element={<FeedPage />} />
                    <Route path="/users" element={<UserListPage />} />
                    <Route path="/users/create" element={<UserCreatePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Post */}
                    {/* <Route path="/posts" element={<PostListPage />} /> */}
                    <Route path="/posts/create" element={<PostCreatePage />} />
                    {/* <Route path="/posts/:postId" element={<PostDetailPage />} />
                    <Route path="/posts/edit/:postId" element={<EditPostPage />} />
                    <Route path="/posts/delete/:postId" element={<DeletePostPage />} /> */}

                    {/* Office */}
                    <Route path="/offices" element={<OfficeListPage />} />
                    <Route path="/offices/create" element={<OfficeCreatePage />} />
                    <Route path="/offices/edit/:officeId" element={<OfficeEditPage />} />
                    <Route path="/offices/:officeId" element={<OfficeDetailPage />} />

                    {/* Department */}
                    <Route path="/departments/*" element={<DepartmentRoutes />} />

                    {/* Management panel routes */}
                    <Route path="/*" element={<ManagementRoutes />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
};

export default AppRouter;
