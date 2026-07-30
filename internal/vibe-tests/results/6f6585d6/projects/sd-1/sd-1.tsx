import {useState, useEffect} from 'react';

interface Data { revenue: number; users: number; orders: number; }

export default function DashboardWidget() {
  const [state, setState] = useState<'loading' | 'error' | 'success'>('loading');
  const [data, setData] = useState<Data | null>(null);

  const fetchData = async () => {
    setState('loading');
    try { const r = await fetch('/api/dashboard'); if (!r.ok) throw new Error(); setData(await r.json()); setState('success'); }
    catch { setState('error'); }
  };

  useEffect(() => { fetchData(); }, []);

  if (state === 'loading') return <div style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 32, textAlign: 'center'}}>Loading...</div>;
  if (state === 'error') return (
    <div style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 24}}>
      <div style={{background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, padding: 12, marginBottom: 12}}><strong>Error:</strong> Failed to load data.</div>
      <button onClick={fetchData} style={{padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer'}}>Retry</button>
    </div>
  );

  return (
    <div style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 24}}>
      <h3 style={{fontSize: 20, fontWeight: 700, marginBottom: 16}}>Dashboard</h3>
      <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <div><p style={{fontSize: 12, color: '#6b7280'}}>Revenue</p><p style={{fontSize: 24, fontWeight: 700}}>${data?.revenue.toLocaleString()}</p></div>
        <div><p style={{fontSize: 12, color: '#6b7280'}}>Users</p><p style={{fontSize: 24, fontWeight: 700}}>{data?.users.toLocaleString()}</p></div>
        <div><p style={{fontSize: 12, color: '#6b7280'}}>Orders</p><p style={{fontSize: 24, fontWeight: 700}}>{data?.orders.toLocaleString()}</p></div>
      </div>
    </div>
  );
}
