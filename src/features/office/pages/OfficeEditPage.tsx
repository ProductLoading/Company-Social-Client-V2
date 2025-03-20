    // src/features/office/pages/OfficeEditPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOfficeDetail, useOfficeActions } from '../hooks';
import { UpdateOfficeInput } from '../types';

const OfficeEditPage: React.FC = () => {
  const { officeId } = useParams();
  const navigate = useNavigate();
  const { selectedOffice, loadOfficeById, loading, error } = useOfficeDetail();
  const { editOffice } = useOfficeActions();

  const [formData, setFormData] = useState<UpdateOfficeInput>({
    officeId: officeId || '',
    city: '',
    buildingName: '',
    address: '',
  });

  useEffect(() => {
    if (officeId) loadOfficeById(officeId);
  }, [officeId]);

  useEffect(() => {
    if (selectedOffice) {
      setFormData({
        officeId: selectedOffice.officeId,
        city: selectedOffice.city,
        buildingName: selectedOffice.buildingName || '',
        address: selectedOffice.address || '',
      });
    }
  }, [selectedOffice]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await editOffice(formData);
      alert('Office updated!');
      navigate('/offices');
    } catch (err) {
      console.error(err);
      alert('Failed to update office');
    }
  };

  if (!officeId) return <p>No officeId route param!</p>;
  if (loading) return <p>Loading office detail...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div>
      <h2>Edit Office</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>City:</label>
          <input
            required
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>
        <div>
          <label>BuildingName:</label>
          <input
            value={formData.buildingName}
            onChange={(e) =>
              setFormData({ ...formData, buildingName: e.target.value })
            }
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default OfficeEditPage;
