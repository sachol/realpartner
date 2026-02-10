import { useState, useEffect } from 'react'
import QuestCard from './components/QuestCard'
import PerformanceCard from './components/PerformanceCard'
import PropertyForm from './components/PropertyForm'
import PropertyCard from './components/PropertyCard'
import LeadCard from './components/LeadCard'

function App() {
  const [view, setView] = useState('dashboard'); // 'dashboard' | 'property' | 'crm'
  const [theme, setTheme] = useState('dark');
  const [showIntro, setShowIntro] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [targetRevenue, setTargetRevenue] = useState(10000000);
  const [currentRevenue, setCurrentRevenue] = useState(6500000);
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [leads, setLeads] = useState([]);

  const [quests, setQuests] = useState([
    { text: '김철수 고객 미팅 (10:00)', completed: true, tag: '미팅' },
    { text: '신규 매물 사진 촬영 및 등록', completed: false, tag: '현장' },
    { text: '등기부등본 변동 사항 확인', completed: false, tag: '법령' },
    { text: '기존 고객 안부 전화 (5명)', completed: false, tag: 'CRM' },
  ]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    fetchProperties();
    fetchLeads();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:4000/properties/user-123');
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Property fetch 실패:', error);
    }
  };

  const fetchLeads = async () => {
    try {
      const response = await fetch('http://localhost:4000/leads/user-123');
      const data = await response.json();
      setLeads(data);
    } catch (error) {
      console.error('Leads fetch 실패:', error);
    }
  };

  const handleSetGoal = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:4000/goals/user-123', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetRevenue }),
      });
      const data = await response.json();
      const thisWeek = data.weeklyGoals[0];
      setQuests([
        { text: `이번 주 임장 목표: ${thisWeek.requiredShowings}건`, completed: false, tag: '현장' },
        { text: `이번 주 전화 목표: ${thisWeek.requiredCalls}건`, completed: false, tag: 'CRM' },
        { text: `이번 주 신규 매물 등록: ${thisWeek.requiredListings}건`, completed: false, tag: '등록' },
        ...quests.slice(0, 1),
      ]);
    } catch (error) {
      console.error('Goal 설정 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProperty = async (formData) => {
    try {
      await fetch('http://localhost:4000/properties/user-123', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      fetchProperties();
      setView('dashboard');
    } catch (error) {
      console.error('Property 저장 실패:', error);
    }
  };

  return (
    <div className="dashboard-container" style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <header className="animate-fade" style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setView('dashboard')}>
          <img 
            src="https://res.cloudinary.com/dkifrgwde/image/upload/v1769261047/KakaoTalk_20250126_164228374_01_ubhmd2.png" 
            alt="Affiliation Logo" 
            className="logo-header"
          />
          <div>
            <h1 className="glow-text" style={{ fontSize: '3rem', marginBottom: '8px', letterSpacing: '-1px' }}>AgentPartner</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>AI 기반 능동형 중개 비즈니스 파트너</p>
          </div>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'flex-end' }}>
            <button className="btn-outline" style={{ padding: '8px 12px', fontSize: '0.8rem' }} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? '☀️ 라이트 모드' : '🌙 다크 모드'}
            </button>
            <button className="btn-outline" style={{ padding: '8px 12px', fontSize: '0.8rem' }} onClick={() => setShowIntro(true)}>소개</button>
            <button className="btn-outline" style={{ padding: '8px 12px', fontSize: '0.8rem' }} onClick={() => setShowGuide(true)}>사용방법</button>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button className={`btn-primary ${view === 'dashboard' ? '' : 'btn-outline'}`} 
              onClick={() => setView('dashboard')}>대시보드</button>
            <button className={`btn-primary ${view === 'crm' ? '' : 'btn-outline'}`}
              onClick={() => setView('crm')}>고객관리</button>
            <button className="btn-primary" style={{ background: '#3b82f6', border: 'none' }} onClick={() => setView('property')}>매물 등록</button>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>2026년 2월 10일</p>
        </div>
      </header>
      
      {view === 'dashboard' && (
        <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
          <PerformanceCard title="월 매출 목표 달성률" current={currentRevenue} target={targetRevenue} unit="원" delay="0.1s" />
          <QuestCard title="Today's Quest" quests={quests} delay="0.2s" />
          <div className="glass-card animate-fade" style={{ animationDelay: '0.3s' }}>
            <h3 style={{ marginBottom: '16px' }}>HOT 리드 고객</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {leads.filter(l => l.grade === 'HOT').slice(0, 2).map(l => (
                <LeadCard key={l.id} lead={l} />
              ))}
              {leads.filter(l => l.grade === 'HOT').length === 0 && <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>현재 HOT 리드가 없습니다. 적극적인 영업이 필요합니다!</p>}
            </div>
          </div>
        </main>
      )}

      {view === 'property' && (
        <PropertyForm onSave={handleSaveProperty} onCancel={() => setView('dashboard')} />
      )}

      {view === 'crm' && (
        <div className="animate-fade">
          <h2 style={{ marginBottom: '32px' }}>고객 인맥 관리 (CRM)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {leads.map(l => (
              <LeadCard key={l.id} lead={l} />
            ))}
            {leads.length === 0 && (
              <div className="glass-card" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px' }}>
                <p style={{ color: 'var(--text-secondary)' }}>등록된 고객이 없습니다. 첫 번째 리드를 추가해보세요.</p>
              </div>
            )}
          </div>
        </div>
      )}
      {showIntro && (
        <div className="modal-overlay" onClick={() => setShowIntro(false)}>
          <div className="modal-content animate-fade" onClick={e => e.stopPropagation()}>
            <h2 style={{ marginBottom: '20px' }}>AgentPartner 소개</h2>
            <p style={{ marginBottom: '15px' }}>**AgentPartner**는 공인중개사의 업무 효율을 극대화하기 위해 설계된 **AI 기반 능동형 비즈니스 파트너**입니다.</p>
            <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><strong>목표 역산 엔진:</strong> 연간/월간 매출 목표를 달성하기 위해 필요한 주간 활동(임장, 전화, 등록)을 수치로 제안합니다.</li>
              <li><strong>AI 리드 스코어링:</strong> 고객의 예산과 시급성을 분석하여 HOT 리드를 선별해 줍니다.</li>
              <li><strong>스마트 컴플라이언스:</strong> 2024년 개정법령에 따른 필수 체크리스트를 통해 중개 사고를 예방합니다.</li>
            </ul>
            <button className="btn-primary" onClick={() => setShowIntro(false)}>닫기</button>
          </div>
        </div>
      )}

      {showGuide && (
        <div className="modal-overlay" onClick={() => setShowGuide(false)}>
          <div className="modal-content animate-fade" onClick={e => e.stopPropagation()}>
            <h2 style={{ marginBottom: '20px' }}>사용 및 활용 방법</h2>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>1. 시작하기</h3>
            <p style={{ marginBottom: '15px' }}>대시보드 상단의 '대시보드' 탭에서 월 목표를 확인하세요. AI가 당신의 성공을 위한 **Today's Quest**를 자동으로 생성합니다.</p>
            
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>2. 고객 관리 (CRM)</h3>
            <p style={{ marginBottom: '15px' }}>'고객관리' 탭에서 새로운 리드를 추가하면 AI가 등급을 부여합니다. <strong>HOT</strong> 등급 고객에게 먼저 연락하여 계약 성공률을 높이세요.</p>
            
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>3. 매물 등록 및 활용</h3>
            <p style={{ marginBottom: '15px' }}>'매물 등록' 버튼을 통해 2024년 법적 필수 항목을 누락 없이 입력할 수 있습니다. 등록된 매물은 적합한 고객과 자동으로 매칭됩니다.</p>
            
            <button className="btn-primary" onClick={() => setShowGuide(false)}>확인 완료</button>
          </div>
        </div>
      )}

      <footer className="footer animate-fade">
        <img 
          src="https://res.cloudinary.com/dkifrgwde/image/upload/v1769261047/KakaoTalk_20250126_164228374_01_ubhmd2.png" 
          alt="Affiliation Logo" 
          className="logo-footer"
        />
        <p>개발자: 노제승(RSA) | © 2026 AgentPartner AI Service</p>
      </footer>
    </div>
  )
}

export default App




