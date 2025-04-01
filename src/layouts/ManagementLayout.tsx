// src/layouts/ManagementLayout.tsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const ManagementLayout: React.FC = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200}>
                <Menu theme="dark" mode="inline">
                    <Menu.Item key="office">
                        <Link to="/admin/offices">Office Management</Link>
                    </Menu.Item>
                    <Menu.Item key="user">
                        <Link to="/admin/users">User Management</Link>
                    </Menu.Item>
                    <Menu.Item key="department">
                        <Link to="/admin/departments">Department Management</Link>
                    </Menu.Item>
                    <Menu.Item key="team">
                        <Link to="/admin/teams">Team Management</Link>
                    </Menu.Item>
                    {/* ... diğer menü item'lar: roles, userTeams, post, comment, etc. */}
                </Menu>
            </Sider>
            <Layout>

                <Content style={{ margin: '16px' }}>
                    <Outlet />
                    {/* Outlet, /admin/offices gibi alt rotaları burada render edecek */}
                </Content>
            </Layout>
        </Layout>
    );
};

export default ManagementLayout;
