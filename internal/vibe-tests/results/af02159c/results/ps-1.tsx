import {useState} from 'react';

const navItems = [
  {section: 'Account', items: ['Profile', 'Security', 'Notifications']},
  {section: 'Workspace', items: ['General', 'Members', 'Billing']},
];

export default function SettingsDashboard() {
  const [selected, setSelected] = useState('Profile');

  return (
    <div style={{fontFamily: 'system-ui, sans-serif', display: 'flex', minHeight: '100vh'}}>
      <aside style={{width: 240, borderRight: '1px solid #e0e0e0', padding: 20}}>
        <h1 style={{fontSize: 20, fontWeight: 700, margin: '0 0 24px'}}>Settings</h1>
        {navItems.map((group) => (
          <div key={group.section} style={{marginBottom: 20}}>
            <p style={{fontSize: 11, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 8px'}}>{group.section}</p>
            {group.items.map((item) => (
              <button
                key={item}
                onClick={() => setSelected(item)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '8px 12px', border: 'none', borderRadius: 6,
                  background: selected === item ? '#f0f0f0' : 'transparent',
                  fontWeight: selected === item ? 600 : 400,
                  cursor: 'pointer', fontSize: 14, marginBottom: 2,
                }}
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </aside>
      <main style={{flex: 1, padding: 32}}>
        <h2 style={{margin: '0 0 8px', fontSize: 24, fontWeight: 600}}>{selected}</h2>
        <p style={{color: '#666', margin: '0 0 24px'}}>Manage your {selected.toLowerCase()} settings.</p>
        <div style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 24}}>
          <p style={{color: '#888'}}>Content for {selected} settings will appear here.</p>
        </div>
      </main>
    </div>
  );
}
