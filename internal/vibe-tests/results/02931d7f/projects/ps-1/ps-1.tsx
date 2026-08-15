import {useState} from 'react';

export default function SettingsDashboard() {
  const [activeSection, setActiveSection] = useState('profile');
  const [name, setName] = useState('Jane Doe');
  const [email, setEmail] = useState('jane@example.com');
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('system');

  const sections = [
    {id: 'profile', label: 'Profile', group: 'Account'},
    {id: 'security', label: 'Security', group: 'Account'},
    {id: 'notifications', label: 'Notifications', group: 'Preferences'},
    {id: 'appearance', label: 'Appearance', group: 'Preferences'},
  ];

  return (
    <div style={{display: 'flex', height: '100vh'}}>
      <aside style={{width: '240px', borderRight: '1px solid #e5e7eb', padding: '20px'}}>
        <h1 style={{fontSize: '20px', fontWeight: 700, marginBottom: '24px'}}>Settings</h1>
        <nav>
          {['Account', 'Preferences'].map((group) => (
            <div key={group} style={{marginBottom: '16px'}}>
              <p style={{fontSize: '12px', color: '#6b7280', fontWeight: 500, marginBottom: '8px', textTransform: 'uppercase'}}>{group}</p>
              {sections.filter(s => s.group === group).map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', borderRadius: '6px', border: 'none', backgroundColor: activeSection === item.id ? '#f3f4f6' : 'transparent', fontWeight: activeSection === item.id ? 500 : 400, cursor: 'pointer', marginBottom: '2px'}}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>
      <main style={{flex: 1, padding: '32px'}}>
        {activeSection === 'profile' && (
          <div style={{border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px'}}>
            <h2 style={{fontSize: '20px', fontWeight: 600, marginBottom: '16px'}}>Profile</h2>
            <hr style={{border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: '16px'}} />
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} style={{width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db'}} />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db'}} />
              </div>
              <button style={{padding: '10px 20px', borderRadius: '8px', backgroundColor: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 500, alignSelf: 'flex-start'}}>Save changes</button>
            </div>
          </div>
        )}
        {activeSection === 'notifications' && (
          <div style={{border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px'}}>
            <h2 style={{fontSize: '20px', fontWeight: 600, marginBottom: '16px'}}>Notifications</h2>
            <hr style={{border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: '16px'}} />
            <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
              <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
              Email notifications
            </label>
          </div>
        )}
        {activeSection === 'appearance' && (
          <div style={{border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px'}}>
            <h2 style={{fontSize: '20px', fontWeight: 600, marginBottom: '16px'}}>Appearance</h2>
            <hr style={{border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: '16px'}} />
            <div>
              <label style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Theme</label>
              <select value={theme} onChange={(e) => setTheme(e.target.value)} style={{padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db'}}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        )}
        {activeSection === 'security' && (
          <div style={{border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px'}}>
            <h2 style={{fontSize: '20px', fontWeight: 600, marginBottom: '16px'}}>Security</h2>
            <hr style={{border: 'none', borderTop: '1px solid #e5e7eb', marginBottom: '16px'}} />
            <p style={{color: '#6b7280', marginBottom: '12px'}}>Manage your password and two-factor authentication settings.</p>
            <button style={{padding: '8px 16px', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: 'white', cursor: 'pointer'}}>Change password</button>
          </div>
        )}
      </main>
    </div>
  );
}
