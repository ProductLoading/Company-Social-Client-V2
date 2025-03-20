// src/features/office/pages/OfficeListPage.tsx
import React, { useEffect } from 'react';
import { useOfficeList, useOfficeActions } from '../hooks';
import { useNavigate } from 'react-router-dom';

const OfficeListPage: React.FC = () => {
  const navigate = useNavigate();
  const { offices, loading, error, loadOffices } = useOfficeList();
  const { deleteOffice } = useOfficeActions();

  useEffect(() => {
    loadOffices(10, 0); // Örnek pagination
  }, []);

  if (loading) return <p>Loading offices...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  const handleDelete = async (officeId: string) => {
    if (!window.confirm('Delete office?')) return;
    await deleteOffice(officeId);
  };

  return (
    <div>
      <h2>Office List</h2>
      <button onClick={() => navigate('/offices/create')}>
        Create Office
      </button>
      <ul>
        {offices.map((office) => (
          <li key={office.officeId} style={{ margin: '8px 0' }}>
            <b>{office.city}</b> - {office.buildingName || 'No name'}{' '}
            <button onClick={() => navigate(`/offices/${office.officeId}`)}>
              Detail
            </button>
            <button onClick={() => navigate(`/offices/edit/${office.officeId}`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(office.officeId)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfficeListPage;
