import React from 'react';

const LeadCard = ({ lead }) => {
  const gradeColors = {
    HOT: '#ef4444',
    WARM: '#f59e0b',
    COLD: '#6b7280'
  };

  return (
    <div className="glass-card" style={{ padding: '20px', borderLeft: `4px solid ${gradeColors[lead.grade]}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h4 style={{ fontSize: '1.2rem' }}>{lead.name} 고객</h4>
        <span style={{ 
          fontSize: '0.7rem', 
          fontWeight: '800', 
          color: gradeColors[lead.grade],
          background: `${gradeColors[lead.grade]}15`,
          padding: '2px 8px',
          borderRadius: '20px',
          border: `1px solid ${gradeColors[lead.grade]}33`
        }}>
          {lead.grade}
        </span>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>예산</p>
          <p style={{ fontWeight: '600' }}>{lead.budget ? `${(lead.budget / 100000000).toFixed(1)}억` : '미정'}</p>
        </div>
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>희망지역</p>
          <p style={{ fontWeight: '600' }}>{lead.preferredRegion || '전체'}</p>
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '8px' }}>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>최근 상담</p>
        <p style={{ fontSize: '0.85rem' }}>
          {lead.notes && lead.notes.length > 0 ? lead.notes[0].content : '상담 이력이 없습니다.'}
        </p>
      </div>
    </div>
  );
};

export default LeadCard;
