import React, { useState } from 'react';
import {
  Form,
  Input,
  Select,
  Upload,
  Button,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useCreatePost } from '../postHooks';
import { CreatePostDto, PostVisibilityScope } from '../types/post.types';
import { POST_VISIBILITY_OPTIONS } from '../constants/post.constants';
import { UploadFile } from 'antd/es/upload/interface';

const { TextArea } = Input;

export const AddPostForm: React.FC = () => {
    const [form] = Form.useForm();
    const [visibilityScope, setVisibilityScope] = useState<PostVisibilityScope>(PostVisibilityScope.PUBLIC);
    const [fileList, setFileList] = useState<File[]>([]);
    const { createPost, isLoading } = useCreatePost();
  
    const parseIds = (value: string | undefined): string[] | undefined => {
      const result = value?.split(',').map((id) => id.trim()).filter(Boolean);
      console.log('📎 parseIds:', value, '→', result);
      return result;
    };
  
    const handleFinish = async (values: any) => {
      console.log('📨 Form gönderildi:', values);
  
      const payload: CreatePostDto = {
        title: values.title,
        content: values.content,
        postType: values.postType,
        visibilityScope: values.visibilityScope,
        files: fileList,
        officeIds: parseIds(values.officeIds),
        departmentIds: parseIds(values.departmentIds),
        teamIds: parseIds(values.teamIds),
      };
  
      console.log('📦 createPost payload:', payload);
  
      try {
        const response = await createPost(payload);
        console.log('✅ Post başarıyla oluşturuldu:', response);
  
        message.success('Gönderi başarıyla oluşturuldu!');
        form.resetFields();
        setFileList([]);
        setVisibilityScope(PostVisibilityScope.PUBLIC);
      } catch (error) {
        console.error('❌ Post oluşturulurken hata:', error);
        message.error('Gönderi oluşturulurken bir hata oluştu.');
      }
    };
  
    return (
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="title" label="Başlık" rules={[{ required: true }]}>
          <Input placeholder="Gönderi başlığı girin" />
        </Form.Item>
  
        <Form.Item name="content" label="İçerik" rules={[{ required: true }]}>
          <TextArea rows={4} placeholder="Gönderi içeriği girin" />
        </Form.Item>
  
        <Form.Item name="postType" label="Post Tipi" rules={[{ required: true }]}>
          <Input placeholder="Örn: announcement, poll, question..." />
        </Form.Item>
  
        <Form.Item name="visibilityScope" label="Görünürlük" rules={[{ required: true }]}>
          <Select
            placeholder="Görünürlük türünü seçin"
            onChange={(value) => {
              console.log('👁️ visibilityScope değişti:', value);
              setVisibilityScope(value);
            }}
            options={POST_VISIBILITY_OPTIONS}
          />
        </Form.Item>
  
        {visibilityScope === PostVisibilityScope.CUSTOM && (
          <>
            <Form.Item name="officeIds" label="Ofis ID'leri">
              <Input placeholder="Virgülle ayırarak girin: abc123, def456" />
            </Form.Item>
  
            <Form.Item name="departmentIds" label="Departman ID'leri">
              <Input placeholder="Virgülle ayırarak girin: dep1, dep2" />
            </Form.Item>
  
            <Form.Item name="teamIds" label="Takım ID'leri">
              <Input placeholder="Virgülle ayırarak girin: team1, team2" />
            </Form.Item>
          </>
        )}
  
        <Form.Item label="Dosyalar">
          <Upload
            beforeUpload={(file) => {
              console.log('📥 Dosya eklendi:', file.name);
              setFileList((prev) => [...prev, file]);
              return false;
            }}
            onRemove={(file) => {
              console.log('🗑️ Dosya silindi:', file.name);
              setFileList((prev) => prev.filter((f) => f.name !== file.name));
            }}
            fileList={fileList.map((file) => ({
              uid: file.name,
              name: file.name,
            }) as UploadFile)}
            multiple
          >
            <Button icon={<UploadOutlined />}>Dosya Ekle</Button>
          </Upload>
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Gönder
          </Button>
        </Form.Item>
      </Form>
    );
  };