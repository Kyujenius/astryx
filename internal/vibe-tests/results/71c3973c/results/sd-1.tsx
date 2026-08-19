import {useState, useEffect} from 'react';

type State = 'loading' | 'error' | 'data';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => { const t = setTimeout(() => setState(Math.random() > 0.3 ? 'data' : 'error'), 2000); return () => clearTimeout(t); }, []);

  return (
    <div style={{border: '1px solid #eee', borderRadius: 8, padding: 24, maxWidth: 320}}>
      <h3 style={{fontSize: 16, fontWeight: 600, marginBottom: 16}}>Revenue</h3>
      {state === 'loading' && <div style={{textAlign: 'center', padding: 24, color: '#666'}}>Loading...</div>}
      {state === 'error' && (<div><div style={{padding: '8px 12px', background: '#fee', border: '1px solid #fcc', borderRadius: 4, marginBottom: 12}}>Failed to load.</div><button onClick={() => { setState('loading'); setTimeout(() => setState('data'), 1500); }} style={{padding: '6px 12px', border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer'}}>Retry</button></div>)}
      {state === 'data' && (<div><p style={{fontSize: 28, fontWeight: 700, margin: 0}}>$42,389</p><p style={{fontSize: 13, color: '#666', margin: '4px 0 0'}}>+12% from last month</p></div>)}
    </div>
  );
}
