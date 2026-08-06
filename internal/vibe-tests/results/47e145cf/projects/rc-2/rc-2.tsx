import {useState} from 'react';
const navItems = ['Dashboard', 'Profile', 'Settings', 'Notifications', 'Help'];

export default function ResponsiveSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [active, setActive] = useState('Dashboard');

  return (
    <div style={{display: 'flex', minHeight: '100vh', fontFamily: 'system-ui'}}>
      {isOpen && <aside style={{width: 240, borderRight: '1px solid #eee', padding: 16}}>
        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}><strong>Navigation</strong><button onClick={() => setIsOpen(false)} style={{border: 'none', background: 'none', cursor: 'pointer'}}>X</button></div>
        {navItems.map(item => <button key={item} onClick={() => setActive(item)} style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', marginBottom: 4, border: 'none', borderRadius: 4, backgroundColor: active === item ? '#e8e8e8' : 'transparent', cursor: 'pointer'}}>{item}</button>)}
      </aside>}
      <main style={{flex: 1, padding: 24}}>
        {!isOpen && <button onClick={() => setIsOpen(true)} style={{marginBottom: 16, padding: '6px 12px', border: '1px solid #ccc', borderRadius: 4}}>Menu</button>}
        <h1>{active}</h1><p style={{color: '#666'}}>Content for {active} goes here.</p>
      </main>
    </div>
  );
}