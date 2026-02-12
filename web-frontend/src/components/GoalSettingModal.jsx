import React, { useState, useEffect } from 'react';

const GoalSettingModal = ({ isOpen, onClose, onSave, initialGoal }) => {
  const [targetRevenue, setTargetRevenue] = useState(initialGoal || 10000000);
  const [tasks, setTasks] = useState({
    contracts: 0,
    showings: 0,
    calls: 0,
    listings: 0
  });

  // Constants for calculation (matching backend)
  const AVG_COMMISSION = 5000000;
  const CLOSING_RATE = 0.2; // 20%
  const SHOWING_RATE = 0.2; // 20%

  useEffect(() => {
    calculateTasks(targetRevenue);
  }, [targetRevenue]);

  const calculateTasks = (revenue) => {
    const requiredContracts = Number(revenue) / AVG_COMMISSION;
    const requiredShowings = Math.ceil(requiredContracts / CLOSING_RATE);
    const requiredCalls = Math.ceil(requiredShowings / SHOWING_RATE);
    const requiredListings = Math.ceil(requiredContracts * 2);

    setTasks({
      contracts: Math.round(requiredContracts * 10) / 10, // 소수점 첫째자리까지 표시
      showings: requiredShowings,
      calls: requiredCalls,
      listings: requiredListings
    });
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(5px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div className="glass-card animate-scale-in" style={{
        width: '90%',
        maxWidth: '500px',
        padding: '30px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          marginBottom: '20px',
          background: 'linear-gradient(to right, #fff, #94a3b8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          이번 달 목표 설정
        </h2>

        <div style={{ marginBottom: '30px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>
            목표 매출액 (원)
          </label>
          <input
            type="number"
            value={targetRevenue}
            onChange={(e) => setTargetRevenue(Number(e.target.value))}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '1.2rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              color: '#fff',
              outline: 'none'
            }}
          />
          <p style={{ marginTop: '8px', fontSize: '0.9rem', color: '#64748b' }}>
            * 평균 중개보수 500만원 기준
          </p>
        </div>

        <div style={{ 
          background: 'rgba(0, 0, 0, 0.2)', 
          borderRadius: '12px', 
          padding: '20px',
          marginBottom: '30px'
        }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px', color: '#e2e8f0' }}>주간 활동 목표 미리보기</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <ActivityItem label="필요 계약" value={`${tasks.contracts}건`} color="#3b82f6" />
            <ActivityItem label="필요 임장" value={`${tasks.showings}회`} color="#10b981" />
            <ActivityItem label="필요 통화" value={`${tasks.calls}통`} color="#f59e0b" />
            <ActivityItem label="매물 확보" value={`${tasks.listings}건`} color="#8b5cf6" />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button 
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            취소
          </button>
          <button 
            onClick={() => onSave(targetRevenue)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--primary-blue), var(--accent-blue))',
              border: 'none',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
            }}
          >
            목표 설정하기
          </button>
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ label, value, color }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    padding: '12px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '8px'
  }}>
    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{label}</span>
    <span style={{ fontSize: '1.2rem', fontWeight: '700', color: color }}>{value}</span>
  </div>
);

export default GoalSettingModal;
