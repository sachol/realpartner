import React from 'react';

const PerformanceCard = ({ title, current, target, unit, delay }) => {
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  return (
    <div className="glass-card animate-fade" style={{ animationDelay: delay }}>
      <h3 style={{ marginBottom: '20px' }}>{title}</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
        <div>
          <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-blue)' }}>{current.toLocaleString()}</span>
          <span style={{ color: 'var(--text-secondary)', marginLeft: '4px' }}>/ {target.toLocaleString()}{unit}</span>
        </div>
        <span style={{ fontWeight: '600', color: 'var(--accent-blue)' }}>{percentage}%</span>
      </div>
      <div style={{ height: '8px', background: 'var(--primary-blue)', borderRadius: '10px', overflow: 'hidden' }}>
        <div 
          style={{ 
            width: `${percentage}%`, 
            height: '100%', 
            background: 'linear-gradient(90deg, var(--accent-blue), #52d1b2)', 
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(100, 255, 218, 0.3)'
          }} 
        />
      </div>
      <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        목표 달성까지 <strong>{(target - current).toLocaleString()}{unit}</strong> 남았습니다.
      </p>
    </div>
  );
};

export default PerformanceCard;
