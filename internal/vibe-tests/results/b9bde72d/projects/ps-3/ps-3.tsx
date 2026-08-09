// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function AdminPanel() {
  const [page, setPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = ['Dashboard', 'Users', 'Settings'];

  return (
    <div style={{display: 'flex', height: '100vh', fontFamily: 'system-ui'}}>
      {sidebarOpen && (
        <aside style={{width: 250, borderRight: '1px solid #e5e7eb', padding: 16}}>
          <h2 style={{fontSize: 18, fontWeight: 600, marginBottom: 16}}>Admin</h2>
          <nav>
            {navItems.map((item) => (
              <button key={item} onClick={() => setPage(item.toLowerCase())} style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', marginBottom: 4, border: 'none', borderRadius: 4, background: page === item.toLowerCase() ? '#f3f4f6' : 'none', fontWeight: page === item.toLowerCase() ? 600 : 400, cursor: 'pointer'}}>
                {item}
              </button>
            ))}
          </nav>
        </aside>
      )}
      <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
        <header style={{borderBottom: '1px solid #e5e7eb', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 16}}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{padding: '4px 8px', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer'}}>
            {sidebarOpen ? 'Hide' : 'Show'}
          </button>
          <h1 style={{fontSize: 20, fontWeight: 600, margin: 0}}>Admin Panel</h1>
        </header>
        <div style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
          <main style={{flex: 1, padding: 24}}>
            <div style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 20}}>
              <h3 style={{marginTop: 0}}>{page.charAt(0).toUpperCase() + page.slice(1)}</h3>
              <p style={{color: '#666'}}>Content for the {page} section.</p>
            </div>
          </main>
          <aside style={{width: 280, borderLeft: '1px solid #e5e7eb', padding: 16}}>
            <h4 style={{marginTop: 0}}>Details</h4>
            <p style={{fontSize: 14, color: '#666'}}>Select an item to view details.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
