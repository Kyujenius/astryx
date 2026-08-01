import {useState} from 'react';

const navItems = ['Dashboard', 'Projects', 'Teams', 'Settings'];

export default function ThemedLayout() {
  const [active, setActive] = useState('Dashboard');

  return (
    <div style={{display: 'flex', height: '100vh', fontFamily: 'system-ui, sans-serif'}}>
      <aside style={{width: 220, background: '#1e293b', color: '#e2e8f0', padding: 16}}>
        <h2 style={{fontSize: 18, fontWeight: 600, color: 'white', marginBottom: 16}}>Navigation</h2>
        <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
          {navItems.map((item) => (
            <li key={item} style={{marginBottom: 4}}>
              <button
                onClick={() => setActive(item)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 12px',
                  border: 'none',
                  borderRadius: 6,
                  background: active === item ? '#334155' : 'transparent',
                  color: active === item ? 'white' : '#94a3b8',
                  fontWeight: active === item ? 500 : 400,
                  cursor: 'pointer',
                  fontSize: 14,
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main style={{flex: 1, padding: 24, background: 'white'}}>
        <h1 style={{fontSize: 24, fontWeight: 600, marginBottom: 8}}>Dashboard</h1>
        <p style={{color: '#666', marginBottom: 16}}>
          This content area uses the default light theme while the sidebar is dark.
        </p>
        <div style={{border: '1px solid #e5e5e5', borderRadius: 8, padding: 24}}>
          Content goes here.
        </div>
      </main>
    </div>
  );
}
