import {useState} from 'react';

const navItems = ['Dashboard', 'Users', 'Settings', 'Reports'];

export default function AdminPanel() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState('Dashboard');

  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <header style={{height: 56, borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <button onClick={() => setCollapsed(!collapsed)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: 18}}>☰</button>
          <h1 style={{margin: 0, fontSize: 18, fontWeight: 600}}>Admin Panel</h1>
        </div>
      </header>
      <div style={{display: 'flex', flex: 1, overflow: 'hidden'}}>
        <aside style={{width: collapsed ? 0 : 220, borderRight: '1px solid #e5e7eb', overflow: 'hidden', transition: 'width 0.2s', padding: collapsed ? 0 : 12}}>
          {navItems.map(item => (
            <button key={item} onClick={() => setActive(item)} style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', borderRadius: 6, background: active === item ? '#eff6ff' : 'none', cursor: 'pointer', fontWeight: active === item ? 600 : 400, fontSize: 14, marginBottom: 2}}>
              {item}
            </button>
          ))}
        </aside>
        <main style={{flex: 1, padding: 24, overflow: 'auto'}}>
          <h2 style={{margin: '0 0 16px', fontSize: 24}}>{active}</h2>
          <p>Content area for {active}</p>
        </main>
        <aside style={{width: 260, borderLeft: '1px solid #e5e7eb', padding: 16}}>
          <h3 style={{margin: '0 0 8px', fontSize: 16, fontWeight: 600}}>Details</h3>
          <p style={{fontSize: 14, color: '#6b7280'}}>Select an item to view details.</p>
        </aside>
      </div>
    </div>
  );
}
