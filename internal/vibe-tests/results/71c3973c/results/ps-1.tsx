import {useState} from 'react';

const navItems = ['General', 'Security', 'Notifications', 'Integrations'];

export default function SettingsDashboard() {
  const [active, setActive] = useState('General');
  return (
    <div style={{display: 'flex', minHeight: '100vh'}}>
      <aside style={{width: 240, borderRight: '1px solid #eee', padding: 24}}>
        <h1 style={{fontSize: 20, fontWeight: 700, marginBottom: 24}}>Settings</h1>
        <nav style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          {navItems.map((item) => (<button key={item} onClick={() => setActive(item)} style={{padding: '8px 12px', textAlign: 'left', border: 'none', borderRadius: 6, background: active === item ? '#f0f0f0' : 'transparent', cursor: 'pointer', fontWeight: active === item ? 600 : 400}}>{item}</button>))}
        </nav>
      </aside>
      <main style={{flex: 1, padding: 32}}>
        <h2 style={{fontSize: 24, fontWeight: 600, marginBottom: 16}}>{active}</h2>
        <div style={{padding: 24, border: '1px solid #eee', borderRadius: 8}}><p style={{color: '#666'}}>Settings content for {active} section.</p></div>
      </main>
    </div>
  );
}
