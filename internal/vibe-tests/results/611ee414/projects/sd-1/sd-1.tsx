// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useEffect} from 'react';

export default function DashboardWidget() {
  const [state, setState] = useState<'loading' | 'error' | 'data'>('loading');
  const [data, setData] = useState<{revenue: number; users: number; growth: number} | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({revenue: 125000, users: 3420, growth: 12.5});
      setState('data');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (state === 'loading') {
    return (
      <div style={{padding: 24, border: '1px solid #e0e0e0', borderRadius: 8, maxWidth: 400}}>
        <div style={{height: 16, background: '#eee', borderRadius: 4, marginBottom: 12, animation: 'pulse 1.5s infinite'}} />
        <div style={{height: 32, background: '#eee', borderRadius: 4, marginBottom: 8}} />
        <div style={{height: 32, background: '#eee', borderRadius: 4}} />
      </div>
    );
  }
  if (state === 'error') {
    return (
      <div style={{padding: 24, border: '1px solid #e0e0e0', borderRadius: 8, maxWidth: 400}}>
        <div style={{padding: 12, background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 4, marginBottom: 12}}>
          <strong>Error:</strong> Failed to load dashboard data
        </div>
        <button onClick={() => setState('loading')} style={{padding: '8px 16px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Retry</button>
      </div>
    );
  }
  return (
    <div style={{padding: 24, border: '1px solid #e0e0e0', borderRadius: 8, maxWidth: 400, fontFamily: 'sans-serif'}}>
      <h3 style={{margin: '0 0 16px'}}>Dashboard Overview</h3>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16}}>
        <div><span style={{fontSize: 12, color: '#666'}}>Revenue</span><p style={{fontSize: 20, fontWeight: 'bold', margin: '4px 0'}}>${data!.revenue.toLocaleString()}</p></div>
        <div><span style={{fontSize: 12, color: '#666'}}>Users</span><p style={{fontSize: 20, fontWeight: 'bold', margin: '4px 0'}}>{data!.users.toLocaleString()}</p></div>
        <div><span style={{fontSize: 12, color: '#666'}}>Growth</span><p style={{fontSize: 20, fontWeight: 'bold', margin: '4px 0'}}>{data!.growth}%</p></div>
      </div>
    </div>
  );
}