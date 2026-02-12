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
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <h4 style={{ fontSize: '1.1rem', margin: 0 }}>{property.buildingName || property.address}</h4>
        {property.complianceStatus === 'VERIFIED' && (
          <span style={{ 
            fontSize: '0.65rem', 
            background: '#00cc6622', 
            color: '#00cc66', 
            padding: '2px 6px', 
            borderRadius: '4px',
            border: '1px solid #00cc6644',
            fontWeight: 'bold'
          }}>
            ✓ 법적 확인 완료
          </span>
        )}
      </div>

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

      <div style={{ marginTop: '12px', borderTop: '1px dotted var(--glass-border)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '0.75rem', color: property.complianceStatus === 'VERIFIED' ? 'var(--text-secondary)' : '#ff4d4d', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {property.complianceStatus === 'VERIFIED' ? '✅ 2024 필수사항 확인됨' : '⚠️ 법적 필수 확인 미완료'}
        </div>
        {property.verifierName && (
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
            확인자: {property.verifierName}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;
