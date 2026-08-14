import {useState, useEffect} from 'react';

type State = 'loading' | 'error' | 'success';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(Math.random() > 0.7 ? 'error' : 'success');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const cardStyle = {border: '1px solid #e0e0e0', borderRadius: 12, padding: 24, fontFamily: 'system-ui, sans-serif'};

  if (state === 'loading') {
    return (
      <div style={cardStyle}>
        <div style={{height: 20, width: 160, background: '#f0f0f0', borderRadius: 4, marginBottom: 16, animation: 'pulse 1.5s infinite'}} />
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16}}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{height: 60, background: '#f0f0f0', borderRadius: 8, animation: 'pulse 1.5s infinite'}} />
          ))}
        </div>
        <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div style={cardStyle}>
        <div style={{background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: 16, marginBottom: 12}}>
          <p style={{color: '#dc2626', margin: 0, fontWeight: 500}}>Failed to load data</p>
          <p style={{color: '#666', margin: '4px 0 0', fontSize: 14}}>Something went wrong.</p>
        </div>
        <button onClick={() => setState('loading')} style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 6, background: '#fff', cursor: 'pointer'}}>Retry</button>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <h3 style={{margin: '0 0 16px', fontSize: 18, fontWeight: 600}}>Revenue Overview</h3>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16}}>
        <div><p style={{color: '#666', fontSize: 14, margin: '0 0 4px'}}>Revenue</p><p style={{fontSize: 24, fontWeight: 700, margin: 0}}>$12,450</p></div>
        <div><p style={{color: '#666', fontSize: 14, margin: '0 0 4px'}}>Orders</p><p style={{fontSize: 24, fontWeight: 700, margin: 0}}>142</p></div>
        <div><p style={{color: '#666', fontSize: 14, margin: '0 0 4px'}}>Growth</p><p style={{fontSize: 24, fontWeight: 700, margin: 0, color: '#16a34a'}}>+12.5%</p></div>
      </div>
    </div>
  );
}
