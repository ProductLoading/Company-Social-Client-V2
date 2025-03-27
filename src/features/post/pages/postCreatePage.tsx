// 🗂️ Yeni post sayfası (AddPostForm içerir)
import React from 'react';
import { AddPostForm } from '../components/AddPostForm';

export const PostCreatePage: React.FC = () => {
    return (
        <div>
            <h2>Yeni Gönderi Oluştur</h2>
            <AddPostForm />
        </div>
    );
};
