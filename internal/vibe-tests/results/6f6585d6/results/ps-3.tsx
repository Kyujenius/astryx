import {useState} from 'react';

const NAV = [{id: 'dashboard', label: 'Dashboard'}, {id: 'users', label: 'Users'}, {id: 'settings', label: 'Settings'}, {id: 'reports', label: 'Reports'}];

export default function AdminPanel() {
  const [active, setActive] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{display: 'flex', height: '100vh', fontFamily: 'system-ui'}}>
      <header style={{position: 'fixed', top: 0, left: 0, right: 0, height: 56, borderBottom: '1px solid #e5e7eb', background: 'white', display: 'flex', alignItems: 'center', paddingLeft: 16, zIndex: 10}}>
        <h1 style={{fontSize: 18, fontWeight: 600}}>Admin Panel</h1>
      </header>
      <aside style={{position: 'fixed', left: 0, top: 56, bottom: 0, width: collapsed ? 64 : 240, borderRight: '1px solid #e5e7eb', background: '#f9fafb', transition: 'width 0.2s', padding: 8}}>
        {NAV.map(item => (
          <button key={item.id} onClick={() => setActive(item.id)} style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 6, border: 'none', background: active === item.id ? '#e5e7eb' : 'transparent', cursor: 'pointer', marginBottom: 4}}>{collapsed ? item.label[0] : item.label}</button>
        ))}
        <button onClick={() => setCollapsed(!collapsed)} style={{position: 'absolute', bottom: 8, right: 8, border: 'none', background: 'none', cursor: 'pointer'}}>{collapsed ? '>' : '<'}</button>
      </aside>
      <main style={{flex: 1, marginTop: 56, marginLeft: collapsed ? 64 : 240, marginRight: 320, padding: 24}}>
        <h2 style={{fontSize: 24, fontWeight: 700, textTransform: 'capitalize'}}>{active}</h2>
        <p>Main content</p>
      </main>
      <aside style={{position: 'fixed', right: 0, top: 56, bottom: 0, width: 320, borderLeft: '1px solid #e5e7eb', padding: 16}}>
        <div style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 16}}><h3 style={{fontWeight: 600}}>Details</h3><p style={{color: '#6b7280'}}>Select an item.</p></div>
      </aside>
    </div>
  );
}
