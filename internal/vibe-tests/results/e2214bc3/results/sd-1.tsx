import {useState, useEffect} from 'react';

type State = 'loading' | 'error' | 'data';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(Math.random() > 0.3 ? 'data' : 'error');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const cardStyle = {width: 400, padding: 24, border: '1px solid #e5e7eb', borderRadius: 12, fontFamily: 'system-ui'};

  if (state === 'loading') {
    return (
      <div style={cardStyle}>
        <div style={{height: 24, width: '60%', backgroundColor: '#f3f4f6', borderRadius: 4, marginBottom: 12, animation: 'pulse 2s infinite'}} />
        <div style={{height: 48, width: '100%', backgroundColor: '#f3f4f6', borderRadius: 4, marginBottom: 12, animation: 'pulse 2s infinite'}} />
        <div style={{height: 16, width: '80%', backgroundColor: '#f3f4f6', borderRadius: 4, animation: 'pulse 2s infinite'}} />
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div style={{...cardStyle, borderColor: '#fecaca'}}>
        <p style={{color: '#dc2626', fontWeight: 600}}>Failed to load data</p>
        <p style={{color: '#6b7280', fontSize: 14}}>Something went wrong.</p>
        <button onClick={() => setState('loading')} style={{marginTop: 12, padding: '6px 12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Retry</button>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <h3 style={{margin: '0 0 8px', fontSize: 16, color: '#6b7280'}}>Monthly Revenue</h3>
      <p style={{fontSize: 36, fontWeight: 'bold', margin: '0 0 4px'}}>$42,350</p>
      <p style={{fontSize: 14, color: '#6b7280'}}>+12.5% from last month</p>
    </div>
  );
}
