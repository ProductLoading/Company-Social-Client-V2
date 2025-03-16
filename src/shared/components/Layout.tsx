import React from 'react';
import { Layout as AntdLayout } from 'antd';

const { Header, Content, Footer } = AntdLayout;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AntdLayout style={{ minHeight: '100vh' }}>
            <Header style={{ color: '#fff' }}>My Social App</Header>
            <Content style={{ padding: '24px' }}>
                {children}
            </Content>
            <Footer style={{ textAlign: 'center' }}>© 2025 My Social App</Footer>
        </AntdLayout>
    );
};

export default Layout;
