
  import { useAuth } from '../hooks/useAuth';
  import { useNavigate } from 'react-router-dom';
  import { Button, Form, Input, Typography, notification, Card, Spin } from 'antd';

  const { Title } = Typography;

  export default function LoginPage() {
    const { login, isAuthLoading } = useAuth();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSubmit = async (values: { email: string; password: string }) => {
      try {
        await login(values.email, values.password);
        notification.success({
          message: 'Giriş başarılı',
          description: 'Başarıyla giriş yaptınız.',
        });
        navigate('/');
      } catch (error) {
        console.error(error);
        notification.error({
          message: 'Giriş başarısız',
          description: 'E-posta veya şifre hatalı.',
        });
      }
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <Card className="w-full max-w-md shadow-lg rounded-2xl" bordered={false}>
          <div className="text-center mb-6">
            <Title level={3}>Giriş Yap</Title>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            disabled={isAuthLoading}
          >
            <Form.Item
              label="E-posta"
              name="email"
              rules={[{ required: true, message: 'Lütfen e-posta adresinizi girin.' }]}
            >
              <Input type="email" placeholder="ornek@mail.com" />
            </Form.Item>

            <Form.Item
              label="Şifre"
              name="password"
              rules={[{ required: true, message: 'Lütfen şifrenizi girin.' }]}
            >
              <Input.Password placeholder="••••••••" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={isAuthLoading}
              >
                Giriş Yap
              </Button>
            </Form.Item>
          </Form>

          {isAuthLoading && (
            <div className="flex justify-center mt-4">
              <Spin tip="Giriş yapılıyor..." />
            </div>
          )}
        </Card>
      </div>
    );
  }
