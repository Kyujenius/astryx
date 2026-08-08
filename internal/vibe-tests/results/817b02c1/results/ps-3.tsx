// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const NAV_ITEMS = [
  {group: 'Main', items: ['Dashboard', 'Users', 'Settings']},
  {group: 'Reports', items: ['Analytics', 'Logs']},
];

export default function AdminPanel() {
  const [page, setPage] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <header style={{height: '56px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: '0 16px', flexShrink: 0}}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px'}}>
          {sidebarOpen ? '←' : '→'}
        </button>
        <span style={{marginLeft: '12px', fontWeight: 600}}>Admin Panel</span>
      </header>
      <div style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
        {sidebarOpen && (
          <aside style={{width: '220px', borderRight: '1px solid #e5e7eb', overflowY: 'auto', padding: '16px', flexShrink: 0}}>
            {NAV_ITEMS.map(group => (
              <div key={group.group} style={{marginBottom: '16px'}}>
                <h4 style={{fontSize: '11px', textTransform: 'uppercase', color: '#888', marginBottom: '8px'}}>{group.group}</h4>
                {group.items.map(item => (
                  <button
                    key={item}
                    onClick={() => setPage(item)}
                    style={{display: 'block', width: '100%', textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', background: page === item ? '#e5e7eb' : 'transparent', cursor: 'pointer', marginBottom: '2px', fontWeight: page === item ? 500 : 400}}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ))}
          </aside>
        )}
        <main style={{flex: 1, overflowY: 'auto', padding: '24px'}}>
          <h2 style={{margin: '0 0 8px'}}>{page}</h2>
          <p style={{color: '#666'}}>Content for the {page.toLowerCase()} section goes here.</p>
        </main>
        <aside style={{width: '256px', borderLeft: '1px solid #e5e7eb', overflowY: 'auto', padding: '16px', flexShrink: 0}}>
          <h3 style={{fontSize: '14px', fontWeight: 500, marginBottom: '12px'}}>Details</h3>
          <p style={{fontSize: '14px', color: '#666'}}>Details panel for {page.toLowerCase()}.</p>
        </aside>
      </div>
    </div>
  );
}
