import React from 'react';

export default function ThemedApp() {
  return (
    <div style={{fontFamily: 'system-ui, sans-serif', padding: '24px'}}>
      <div style={{border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', maxWidth: '500px'}}>
        <h1 style={{fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px'}}>Brand Theme Demo</h1>
        <p style={{color: '#64748b', margin: '0 0 16px'}}>
          This page uses a custom brand theme with an indigo accent color.
        </p>
        <div style={{display: 'flex', gap: '8px'}}>
          <button style={{padding: '10px 20px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer'}}>Primary Action</button>
          <button style={{padding: '10px 20px', backgroundColor: '#fff', border: '1px solid #6366f1', color: '#6366f1', borderRadius: '8px', cursor: 'pointer'}}>Secondary</button>
          <span style={{padding: '4px 12px', backgroundColor: '#eef2ff', color: '#6366f1', borderRadius: '4px', fontSize: '14px', display: 'inline-flex', alignItems: 'center'}}>Themed Badge</span>
        </div>
      </div>
    </div>
  );
}
