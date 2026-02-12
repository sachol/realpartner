import React, { useState } from 'react';

const PropertyForm = ({ onSave, onCancel }) => {
  const [address, setAddress] = useState('');
  const [formData, setFormData] = useState({
    detailAddress: '',
    buildingName: '',
    type: '아파트',
    exclusiveArea: '',
    floor: '',
    fixedMaintenanceFee: 0,
    realMaintenanceFeeDesc: '',
    // Compliance fields
    isConfirmedFixedDate: false,
    isTaxPaymentConfirmed: false,
    isOccupancyConfirmed: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchPublicData = async () => {
    if (!address) return alert('주소를 입력해주세요.');
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/properties/public-data/fetch?address=${address}`);
      const data = await response.json();
      setFormData(prev => ({ ...prev, ...data }));
    } catch (error) {
      console.error('공공데이터 호출 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-card animate-fade" style={{ maxWidth: '800px', margin: '20px auto' }}>
      <h2 style={{ marginBottom: '24px' }}>신규 매물 등록</h2>
      
      <div style={{ display: 'grid', gap: '20px' }}>
        <section>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>주소 정보</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="도로명 또는 지번 주소" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              style={{ flex: 1, padding: '12px', background: 'var(--primary-blue)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px' }}
            />
            <button className="btn-primary" onClick={handleFetchPublicData} disabled={isLoading}>
              {isLoading ? '조회 중...' : '데이터 불러오기'}
            </button>
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>건물명</label>
            <input type="text" value={formData.buildingName} readOnly style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', borderRadius: '8px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>전용면적 (㎡)</label>
            <input type="text" value={formData.exclusiveArea} readOnly style={{ width: '100%', padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', borderRadius: '8px' }} />
          </div>
        </section>

        <section style={{ padding: '20px', background: 'rgba(100, 255, 218, 0.05)', borderRadius: '12px', border: '1px solid rgba(100, 255, 218, 0.2)' }}>
          <h4 style={{ marginBottom: '16px', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚠️ 2024년 개정 공인중개사법 필수 확인</span>
            {!formData.isConfirmedFixedDate || !formData.isTaxPaymentConfirmed || !formData.isOccupancyConfirmed ? 
              <span style={{ fontSize: '0.7rem', background: '#ff4d4d', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>미완료</span> : 
              <span style={{ fontSize: '0.7rem', background: '#00cc66', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>확인 완료</span>
            }
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.isConfirmedFixedDate} onChange={(e) => setFormData({...formData, isConfirmedFixedDate: e.target.checked})} />
              확정일자 부여 현황 확인 (임차인 보호)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.isTaxPaymentConfirmed} onChange={(e) => setFormData({...formData, isTaxPaymentConfirmed: e.target.checked})} />
              임대인 국세/지방세 완납 증명 확인
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.isOccupancyConfirmed} onChange={(e) => setFormData({...formData, isOccupancyConfirmed: e.target.checked})} />
              전입세대 확인서 열람 완료
            </label>
          </div>
          <p style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            * 위 항목 중 하나라도 누락될 경우, 과태료 부과 및 중개사고의 원인이 될 수 있습니다.
          </p>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>관리비 정보 (투명화 고지)</label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input 
                type="number" 
                placeholder="정액 관리비" 
                value={formData.fixedMaintenanceFee} 
                onChange={(e) => setFormData({...formData, fixedMaintenanceFee: Number(e.target.value)})}
                style={{ flex: 1, padding: '12px', background: 'var(--primary-blue)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px' }}
              />
              <span style={{ color: 'var(--text-secondary)' }}>원</span>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>확인자 성명</label>
            <input 
              type="text" 
              placeholder="공인중개사 성함" 
              value={formData.verifierName || ''} 
              onChange={(e) => setFormData({...formData, verifierName: e.target.value})}
              style={{ width: '100%', padding: '12px', background: 'var(--primary-blue)', border: '1px solid var(--glass-border)', color: 'white', borderRadius: '8px' }}
            />
          </div>
        </section>

        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
          <button 
            className="btn-primary" 
            style={{ flex: 1 }} 
            onClick={() => {
              if (!formData.verifierName) return alert('확인자 성명을 입력해주세요.');
              onSave({...formData, address});
            }}
          >
            매물 등록 및 검증 완료
          </button>
          <button style={{ flex: 1, background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', borderRadius: '8px' }} onClick={onCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;
