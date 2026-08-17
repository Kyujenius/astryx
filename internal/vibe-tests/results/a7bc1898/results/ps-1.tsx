import {useState} from 'react';

const navSections = [
  {title: 'Account', items: ['General', 'Security', 'Notifications']},
  {title: 'App', items: ['Appearance', 'Integrations']},
];

export default function SettingsDashboard() {
  const [activePage, setActivePage] = useState('General');

  return (
    <div style={{display: 'flex', height: '100vh'}}>
      <aside style={{width: 240, borderRight: '1px solid #e5e5e5', padding: 16, display: 'flex', flexDirection: 'column', gap: 16}}>
        <h2 style={{fontSize: 18, fontWeight: 700}}>Settings</h2>
        {navSections.map(section => (
          <div key={section.title}>
            <p style={{fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: '#888', marginBottom: 4}}>{section.title}</p>
            {section.items.map(item => (
              <button
                key={item}
                onClick={() => setActivePage(item)}
                style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 14, background: activePage === item ? '#f0f7ff' : 'transparent', color: activePage === item ? '#0066ff' : '#333', fontWeight: activePage === item ? 500 : 400, marginBottom: 2}}
              >
                {item}
              </button>
            ))}
          </div>
        ))}
      </aside>
      <main style={{flex: 1, padding: 32}}>
        <h1 style={{fontSize: 24, fontWeight: 700}}>{activePage}</h1>
        <p style={{marginTop: 8, color: '#666'}}>Configure your {activePage.toLowerCase()} settings here.</p>
      </main>
    </div>
  );
}
