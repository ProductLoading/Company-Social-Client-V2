import { useState } from 'react';
import {
  useGetTeamsQuery,
  useCreateTeamMutation,
} from '../teamApi';
import {
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Skeleton,
  message,
  Card,
  Row,
  Col,
  Space,
} from 'antd';

const { Title, Paragraph } = Typography;

const TeamList = () => {
  const { data: teams, isLoading, error, refetch } = useGetTeamsQuery();
  const [createTeam, { isLoading: isCreating }] = useCreateTeamMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleCreateTeam = async (values: any) => {
    try {
      await createTeam(values).unwrap();
      message.success('Takım başarıyla oluşturuldu!');
      setIsModalOpen(false);
      form.resetFields();
      refetch();
    } catch (err) {
      message.error('Takım oluşturulurken hata oluştu.');
    }
  };

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            + Takım Ekle
          </Button>
        </div>

        {isLoading ? (
          <Skeleton active />
        ) : error ? (
          <Paragraph>Hata oluştu.</Paragraph>
        ) : (
          <Row gutter={[16, 16]}>
            {teams?.map((team) => (
              <Col xs={24} sm={12} md={8} key={team.teamId}>
                <Card
                  title={team.name}
                  bordered={false}
                  hoverable
                  style={{ borderRadius: 8 }}
                >
                  <Paragraph>{team.description}</Paragraph>
                  <Paragraph type="secondary">
                    <strong>Yönetici:</strong> {team.manager.firstName} {team.manager.lastName}
                  </Paragraph>
                  <Paragraph type="secondary">
                    <strong>Departman:</strong> {team.department.name}
                  </Paragraph>
                  <Paragraph type="secondary">
                    <strong>Ofis:</strong> {team.department.office.city}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Space>

      <Modal
        title="Yeni Takım Ekle"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        confirmLoading={isCreating}
        okText="Oluştur"
        cancelText="İptal"
      >
        <Form form={form} layout="vertical" onFinish={handleCreateTeam}>
          <Form.Item
            label="Takım Adı"
            name="name"
            rules={[{ required: true, message: 'Takım adı zorunlu' }]}
          >
            <Input placeholder="Örn: Frontend Ekibi" />
          </Form.Item>
          <Form.Item label="Açıklama" name="description">
            <Input.TextArea rows={3} placeholder="Bu takım ne iş yapar?" />
          </Form.Item>
          <Form.Item
            label="Departman ID"
            name="departmentId"
            rules={[{ required: true, message: 'Departman ID gerekli' }]}
          >
            <Input placeholder="Departman ID giriniz" />
          </Form.Item>
          <Form.Item
            label="Yönetici Kullanıcı ID"
            name="managerId"
            rules={[{ required: true, message: 'Yönetici ID gerekli' }]}
          >
            <Input placeholder="Manager kullanıcı ID giriniz" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamList;
