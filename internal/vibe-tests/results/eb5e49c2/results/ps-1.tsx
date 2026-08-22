import {useState} from 'react';

const sections = [
  {title: 'Account', items: ['Profile', 'Password', 'Email']},
  {title: 'Preferences', items: ['Appearance', 'Notifications', 'Language']},
  {title: 'Billing', items: ['Plan', 'Payment Methods', 'Invoices']},
];

export default function SettingsDashboard() {
  const [active, setActive] = useState('Profile');

  return (
    <div style={{display: 'flex', height: '100vh', fontFamily: 'sans-serif'}}>
      <aside style={{width: 240, borderRight: '1px solid #e0e0e0', padding: 16}}>
        <h2 style={{fontSize: 18, fontWeight: 600, marginBottom: 16}}>Settings</h2>
        <nav>
          {sections.map((section) => (
            <div key={section.title} style={{marginBottom: 16}}>
              <p style={{fontSize: 11, fontWeight: 600, textTransform: 'uppercase', color: '#666', marginBottom: 4}}>{section.title}</p>
              {section.items.map((item) => (
                <button
                  key={item}
                  onClick={() => setActive(item)}
                  style={{display: 'block', width: '100%', textAlign: 'left', padding: '6px 8px', border: 'none', borderRadius: 4, cursor: 'pointer', background: active === item ? '#f0f0f0' : 'transparent', fontWeight: active === item ? 500 : 400}}
                >
                  {item}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <main style={{flex: 1, padding: 32}}>
        <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 8}}>{active}</h1>
        <p style={{color: '#666'}}>Configure your {active.toLowerCase()} settings here.</p>
      </main>
    </div>
  );
}
