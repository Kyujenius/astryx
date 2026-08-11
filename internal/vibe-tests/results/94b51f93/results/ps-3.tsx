// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui'}}>
      <header style={{height: 56, borderBottom: '1px solid #e5e5e5', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12, flexShrink: 0}}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{border: 'none', backgroundColor: 'transparent', cursor: 'pointer', fontSize: 18}} aria-label="Toggle sidebar">
          {sidebarOpen ? '\u2190' : '\u2192'}
        </button>
        <h1 style={{fontSize: 16, fontWeight: 600, margin: 0}}>Admin Panel</h1>
      </header>
      <div style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
        {sidebarOpen && (
          <aside style={{width: 240, borderRight: '1px solid #e5e5e5', padding: 16, flexShrink: 0}}>
            <nav>
              {['Dashboard', 'Users', 'Settings', 'Reports'].map((item) => (
                <a key={item} href="#" style={{display: 'block', padding: '8px 12px', borderRadius: 6, textDecoration: 'none', color: '#333', fontSize: 14}}>{item}</a>
              ))}
            </nav>
          </aside>
        )}
        <main style={{flex: 1, padding: 24, overflow: 'auto'}}>
          <h2 style={{marginBottom: 16}}>Dashboard</h2>
          <p style={{color: '#666'}}>Main content area.</p>
        </main>
        <aside style={{width: 280, borderLeft: '1px solid #e5e5e5', padding: 16, flexShrink: 0}}>
          <h3 style={{fontSize: 14, fontWeight: 600, marginBottom: 12}}>Details</h3>
          <p style={{fontSize: 14, color: '#666'}}>Select an item to view details.</p>
        </aside>
      </div>
    </div>
  );
}
