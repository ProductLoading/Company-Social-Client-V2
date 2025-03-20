// src/features/office/pages/OfficeCreatePage.tsx
import React, { useState } from 'react';
import { useOfficeActions } from '../hooks';
import { CreateOfficeInput } from '../types';
import { useNavigate } from 'react-router-dom';

const OfficeCreatePage: React.FC = () => {
    const navigate = useNavigate();
    const { addOffice } = useOfficeActions();
    const [formData, setFormData] = useState<CreateOfficeInput>({
        city: '',
        buildingName: '',
        address: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addOffice(formData);
            alert('Office created!');
            navigate('/offices');
        } catch (err) {
            console.error(err);
            alert('Failed to create office');
        }
    };

    return (
        <div>
            <h2>Create Office</h2>
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
                        value={formData.buildingName || ''}
                        onChange={(e) =>
                            setFormData({ ...formData, buildingName: e.target.value })
                        }
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        value={formData.address || ''}
                        onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                        }
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default OfficeCreatePage;
