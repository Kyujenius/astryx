import {useState} from 'react';
const navItems = ['General', 'Notifications', 'Security', 'Appearance', 'Integrations'];

export default function SettingsDashboard() {
  const [active, setActive] = useState('General');
  return (
    <div style={{minHeight: '100vh', fontFamily: 'system-ui'}}>
      <header style={{borderBottom: '1px solid #eee', padding: 16}}><h1 style={{margin: 0, fontSize: 20}}>Settings</h1></header>
      <div style={{display: 'flex'}}>
        <aside style={{width: 200, borderRight: '1px solid #eee', padding: 16}}>{navItems.map(item => <button key={item} onClick={() => setActive(item)} style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', marginBottom: 4, border: 'none', borderRadius: 4, backgroundColor: active === item ? '#e8e8e8' : 'transparent', cursor: 'pointer'}}>{item}</button>)}</aside>
        <main style={{flex: 1, padding: 24}}><h2>{active}</h2><hr style={{border: 'none', borderTop: '1px solid #eee', margin: '16px 0'}} /><div style={{border: '1px solid #eee', borderRadius: 8, padding: 16}}><h3>{active} Settings</h3><p style={{color: '#666'}}>Configure your {active.toLowerCase()} preferences here.</p></div></main>
      </div>
    </div>
  );
}