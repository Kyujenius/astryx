// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useEffect} from 'react';

type State = 'loading' | 'error' | 'success';

export default function DashboardWidget() {
  const [state, setState] = useState<State>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(Math.random() > 0.3 ? 'success' : 'error');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const retry = () => {
    setState('loading');
    setTimeout(() => setState('success'), 1500);
  };

  return (
    <div style={{border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, width: 400, boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
      <h4 style={{margin: '0 0 16px 0', fontSize: 16, fontWeight: 600}}>Revenue Overview</h4>
      {state === 'loading' && (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 120, gap: 8}}>
          <div style={{width: 32, height: 32, border: '3px solid #e5e7eb', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 1s linear infinite'}} />
          <p style={{color: '#6b7280', fontSize: 14, margin: 0}}>Loading data...</p>
        </div>
      )}
      {state === 'error' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <div style={{background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: 12}}>
            <p style={{color: '#991b1b', margin: 0, fontSize: 14}}>Failed to load revenue data. Please try again.</p>
          </div>
          <button onClick={retry} style={{padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db', background: 'white', cursor: 'pointer'}}>Retry</button>
        </div>
      )}
      {state === 'success' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <p style={{color: '#6b7280', fontSize: 12, margin: '0 0 4px'}}>Total Revenue</p>
              <p style={{fontSize: 24, fontWeight: 700, margin: 0}}>$48,290</p>
            </div>
            <div>
              <p style={{color: '#6b7280', fontSize: 12, margin: '0 0 4px'}}>Growth</p>
              <p style={{fontSize: 18, fontWeight: 600, color: '#16a34a', margin: 0}}>+12.5%</p>
            </div>
          </div>
          <p style={{color: '#9ca3af', fontSize: 12, margin: 0}}>Last updated: 2 minutes ago</p>
        </div>
      )}
    </div>
  );
}
