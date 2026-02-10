import React from 'react';

const PropertyCard = ({ property }) => {
  const statusColors = {
    AVAILABLE: 'var(--accent-blue)',
    PENDING: '#f97316',
    COMPLETED: '#64748b'
  };

  return (
    <div className="glass-card" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
        <span style={{ 
          fontSize: '0.7rem', 
          fontWeight: '700', 
          padding: '4px 8px', 
          borderRadius: '4px', 
          background: `${statusColors[property.status]}22`, 
          color: statusColors[property.status],
          border: `1px solid ${statusColors[property.status]}44`
        }}>
          {property.status}
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{property.type}</span>
      </div>
      <h4 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{property.buildingName || property.address}</h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>{property.address} {property.detailAddress}</p>
      
      <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
        <div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>전용면적</p>
          <p style={{ fontWeight: '600' }}>{property.exclusiveArea}㎡</p>
        </div>
        <div>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>관리비</p>
          <p style={{ fontWeight: '600' }}>{property.fixedMaintenanceFee.toLocaleString()}원</p>
        </div>
      </div>

      {!property.isConfirmedFixedDate && (
        <div style={{ marginTop: '12px', fontSize: '0.75rem', color: '#ff4d4d', display: 'flex', alignItems: 'center', gap: '4px' }}>
          ⚠️ 법적 필수 확인 미완료
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
