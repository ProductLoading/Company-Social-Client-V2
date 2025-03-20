// src/features/office/pages/OfficeDetailPage.tsx
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOfficeDetail } from '../hooks';

const OfficeDetailPage: React.FC = () => {
    const { officeId } = useParams();
    const { selectedOffice, loading, error, loadOfficeById } = useOfficeDetail();

    useEffect(() => {
        if (officeId) loadOfficeById(officeId);
    }, [officeId]);

    if (!officeId) return <p>No officeId provided</p>;
    if (loading) return <p>Loading office detail...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    if (!selectedOffice) return <p>Office not found</p>;

    return (
        <div>
            <h2>Office Detail</h2>
            <p><b>ID:</b> {selectedOffice.officeId}</p>
            <p><b>City:</b> {selectedOffice.city}</p>
            <p><b>BuildingName:</b> {selectedOffice.buildingName}</p>
            <p><b>Address:</b> {selectedOffice.address}</p>
        </div>
    );
};

export default OfficeDetailPage;
