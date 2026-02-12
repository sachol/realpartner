import React, { useState, useEffect } from 'react';

const LeadForm = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    budget: '',
    preferredRegion: '',
    targetDate: '',
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        budget: initialData.budget ? initialData.budget.toString() : ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return alert('성함을 입력해주세요.');
    onSave({
      ...formData,
      budget: Number(formData.budget) || 0
    });
  };

  return (
    <div className="glass-card animate-fade" style={{ padding: '32px', maxWidth: '600px', margin: '0 auto' }}>
      <h3 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>
        {initialData ? '고객 정보 수정' : '신규 고객 등록'}
      </h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>성함</label>
            <input 
              type="text" 
              className="input-field" 
              value={formData.name} 
              onChange={e => setFormData({...formData, name: e.target.value})} 
              placeholder="홍길동"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>연락처</label>
            <input 
              type="text" 
              className="input-field" 
              value={formData.phone} 
              onChange={e => setFormData({...formData, phone: e.target.value})} 
              placeholder="010-0000-0000"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>가용 예산 (원)</label>
            <input 
              type="number" 
              className="input-field" 
              value={formData.budget} 
              onChange={e => setFormData({...formData, budget: e.target.value})} 
              placeholder="예: 500000000"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>입주 희망일</label>
            <input 
              type="date" 
              className="input-field" 
              value={formData.targetDate ? formData.targetDate.split('T')[0] : ''} 
              onChange={e => setFormData({...formData, targetDate: e.target.value})} 
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>희망 지역</label>
          <input 
            type="text" 
            className="input-field" 
            value={formData.preferredRegion} 
            onChange={e => setFormData({...formData, preferredRegion: e.target.value})} 
            placeholder="예: 서울 강남구, 경기 판교"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>상담 메모</label>
          <textarea 
            className="input-field" 
            style={{ height: '100px', resize: 'none' }}
            value={formData.notes}
            onChange={e => setFormData({...formData, notes: e.target.value})}
            placeholder="고객님의 핵심 니즈를 기록하세요."
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
          <button type="submit" className="btn-primary" style={{ flex: 1 }}>
            {initialData ? '수정 완료' : '고객 등록'}
          </button>
          <button type="button" className="btn-outline" style={{ flex: 1 }} onClick={onCancel}>
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
