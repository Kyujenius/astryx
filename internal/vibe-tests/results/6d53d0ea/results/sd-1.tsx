import {useState, useEffect} from 'react';

type State = 'loading' | 'error' | 'success';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');
  const [data, setData] = useState<{users: number; revenue: string; orders: number} | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Math.random() > 0.5) {
        setData({users: 1234, revenue: '$12,345', orders: 89});
        setState('success');
      } else {
        setState('error');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const retry = () => {
    setState('loading');
    setTimeout(() => {
      setData({users: 1234, revenue: '$12,345', orders: 89});
      setState('success');
    }, 1500);
  };

  return (
    <div style={{maxWidth: 400, border: '1px solid #e5e5e5', borderRadius: 8, padding: 24, fontFamily: 'system-ui, sans-serif'}}>
      <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>Dashboard</h2>
      {state === 'loading' && (
        <div style={{textAlign: 'center', padding: 32, color: '#666'}}>
          <div style={{fontSize: 14}}>Loading data...</div>
        </div>
      )}
      {state === 'error' && (
        <div style={{background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, padding: 16}}>
          <strong style={{color: '#dc2626'}}>Failed to load data</strong>
          <p style={{margin: '4px 0 8px', fontSize: 14, color: '#666'}}>Something went wrong.</p>
          <button onClick={retry} style={{padding: '6px 12px', border: '1px solid #ccc', borderRadius: 4, background: 'white', cursor: 'pointer'}}>
            Retry
          </button>
        </div>
      )}
      {state === 'success' && data && (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16}}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: 12, color: '#666'}}>Users</div>
            <div style={{fontSize: 24, fontWeight: 700}}>{data.users}</div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: 12, color: '#666'}}>Revenue</div>
            <div style={{fontSize: 24, fontWeight: 700}}>{data.revenue}</div>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: 12, color: '#666'}}>Orders</div>
            <div style={{fontSize: 24, fontWeight: 700}}>{data.orders}</div>
          </div>
        </div>
      )}
    </div>
  );
}
