import {useState, useEffect} from 'react';

type WidgetState = 'loading' | 'error' | 'success';

export default function DashboardWidget() {
  const [state, setState] = useState<WidgetState>('loading');
  const [data, setData] = useState<{revenue: number; orders: number; customers: number} | null>(null);

  const fetchData = () => {
    setState('loading');
    setTimeout(() => {
      if (Math.random() < 0.3) { setState('error'); }
      else { setData({revenue: 42500, orders: 187, customers: 1243}); setState('success'); }
    }, 1500);
  };

  useEffect(() => { fetchData(); }, []);

  const cardStyle = {border: '1px solid #e0e0e0', borderRadius: 12, padding: 24, background: '#fff'};

  if (state === 'loading') {
    return (
      <div style={{...cardStyle, textAlign: 'center' as const}}>
        <div style={{fontSize: 24, animation: 'spin 1s linear infinite'}}>⏳</div>
        <p style={{color: '#666'}}>Loading dashboard data...</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div style={{...cardStyle, background: '#fef2f2', borderColor: '#fca5a5'}}>
        <p style={{margin: 0, fontWeight: 600, color: '#dc2626'}}>Failed to load dashboard data</p>
        <p style={{margin: '4px 0 12px', fontSize: 14, color: '#666'}}>Check your connection and try again.</p>
        <button onClick={fetchData} style={{padding: '6px 16px', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer', background: '#fff'}}>Retry</button>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <h3 style={{margin: '0 0 16px'}}>Dashboard</h3>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, textAlign: 'center' as const}}>
        <div><p style={{margin: 0, fontSize: 12, color: '#666'}}>Revenue</p><p style={{margin: 0, fontSize: 24, fontWeight: 700}}>${data!.revenue.toLocaleString()}</p></div>
        <div><p style={{margin: 0, fontSize: 12, color: '#666'}}>Orders</p><p style={{margin: 0, fontSize: 24, fontWeight: 700}}>{data!.orders}</p></div>
        <div><p style={{margin: 0, fontSize: 12, color: '#666'}}>Customers</p><p style={{margin: 0, fontSize: 24, fontWeight: 700}}>{data!.customers.toLocaleString()}</p></div>
      </div>
    </div>
  );
}
