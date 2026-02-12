import React from 'react';

const MarketingModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const handleCopy = () => {
    // HTML 태그 제거하고 텍스트만 복사
    const textOnly = data.htmlContent.replace(/<[^>]*>?/gm, '').trim();
    navigator.clipboard.writeText(textOnly);
    alert('문구가 복사되었습니다! (텍스트 버전)');
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div className="modal-content animate-fade" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px', background: 'var(--primary-blue)', border: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0 }}>AI 마케팅 문구 제안</h2>
          <button className="btn-outline" onClick={onClose} style={{ padding: '4px 12px' }}>닫기</button>
        </div>

        <div style={{ 
          background: 'rgba(255,255,255,0.05)', 
          borderRadius: '12px', 
          padding: '10px',
          marginBottom: '20px',
          border: '1px solid var(--glass-border)'
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>AI가 생성한 미리보기:</p>
          {/* HTML 렌더링 */}
          <div 
            dangerouslySetInnerHTML={{ __html: data.htmlContent }} 
            style={{ borderRadius: '8px', overflow: 'hidden' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-primary" style={{ flex: 1 }} onClick={handleCopy}>
            📋 문구 복사하기
          </button>
          <button className="btn-outline" style={{ flex: 1 }} onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketingModal;
