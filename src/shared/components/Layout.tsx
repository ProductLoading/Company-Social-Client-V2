import React from 'react';
import { Layout as AntdLayout, Avatar, Badge, Dropdown, Menu } from 'antd';
import {
    BellOutlined,
    MessageOutlined,
    UserOutlined,
    DownOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = AntdLayout;

const userMenu = (
    <Menu>
        <Menu.Item key="profile">Profilim</Menu.Item>
        <Menu.Item key="settings">Ayarlar</Menu.Item>
        <Menu.Item key="logout">Çıkış Yap</Menu.Item>
    </Menu>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AntdLayout style={{ minHeight: '100vh' }}>
            <Header
                style={{
                    backgroundColor: '#F5FAFD ',
                    boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
                    // 24px padding add 
                    padding: '0 0px',
                    height: '92px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        maxWidth: '1200px',
                        width: '100%',
                        margin: '0 auto',
                    }}
                >
                    <img
                        src="/edited.png"
                        alt="Company Social Logo"
                        style={{ height: '80px', objectFit: 'contain' }}
                    />

                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <Badge count={5} offset={[0, 0]}>
                            <BellOutlined style={{ fontSize: '22px', cursor: 'pointer' }} />
                        </Badge>
                        <Badge count={2} offset={[0, 0]}>
                            <MessageOutlined style={{ fontSize: '22px', cursor: 'pointer' }} />
                        </Badge>
                        <Dropdown overlay={userMenu} placement="bottomRight">
                            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
                                <span>Kullanıcı</span>
                                <DownOutlined style={{ marginLeft: 4 }} />
                            </div>
                        </Dropdown>
                    </div>
                </div>
            </Header>


            <Content
            // style={{ backgroundColor: '#F5FAFD' }}
            >{children}</Content>

            <Footer style={{ textAlign: 'center' }}>© 2025 Company Social</Footer>
        </AntdLayout >
    );
};

export default Layout;