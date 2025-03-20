// src/features/office/pages/OfficeDetailPage.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Button, message } from 'antd';
import { useOfficeDetail } from '../hooks';

const OfficeDetailPage: React.FC = () => {
  const { officeId } = useParams<{ officeId: string }>();
  const navigate = useNavigate();
  const { selectedOffice, loading, error, loadOfficeById } = useOfficeDetail();

  useEffect(() => {
    if (officeId) {
      loadOfficeById(officeId).catch(() => {
        message.error('Failed to load office detail');
      });
    }
  }, [officeId]);

  if (loading) return <Spin />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!selectedOffice) return <p>Office not found</p>;

  return (
    <Card title={selectedOffice.city} style={{ maxWidth: 600 }}>
      <p><b>Building:</b> {selectedOffice.buildingName}</p>
      <p><b>Address:</b> {selectedOffice.address}</p>
      <Button onClick={() => navigate('/offices')}>Back</Button>
      <Button onClick={() => navigate(`/offices/edit/${officeId}`)}>Edit</Button>
    </Card>
  );
};

export default OfficeDetailPage;
