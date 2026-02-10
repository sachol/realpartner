import React from 'react';

const QuestCard = ({ title, quests, delay }) => {
  return (
    <div className="glass-card animate-fade" style={{ animationDelay: delay }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '1.25rem' }}>{title}</h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--accent-blue)', background: 'rgba(100, 255, 218, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
          Weekly Quest
        </span>
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {quests.map((quest, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: quest.completed ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
            <div style={{ 
              width: '20px', 
              height: '20px', 
              border: '2px solid var(--accent-blue)', 
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: quest.completed ? 'var(--accent-blue)' : 'transparent',
              cursor: 'pointer'
            }}>
              {quest.completed && <span style={{ color: 'var(--primary-deep)', fontSize: '14px', fontWeight: 'bold' }}>✓</span>}
            </div>
            <span style={{ textDecoration: quest.completed ? 'line-through' : 'none', flex: 1 }}>{quest.text}</span>
            {quest.tag && <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', border: '1px solid var(--glass-border)', padding: '2px 6px', borderRadius: '4px' }}>{quest.tag}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestCard;
