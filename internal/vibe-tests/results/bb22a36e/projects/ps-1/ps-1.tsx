import {useState} from 'react';

export default function SettingsDashboard() {
  const [section, setSection] = useState('general');
  const [name, setName] = useState('');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const navItems = ['General', 'Notifications', 'Security', 'Billing'];

  return (
    <div style={{display: 'flex', minHeight: '100vh'}}>
      <aside style={{width: 220, borderRight: '1px solid #e5e7eb', padding: 16}}>
        <h2 style={{fontSize: 18, fontWeight: 700, marginBottom: 16}}>Settings</h2>
        <nav style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          {navItems.map((item) => (
            <button key={item} onClick={() => setSection(item.toLowerCase())} style={{textAlign: 'left', padding: '8px 12px', border: 'none', borderRadius: 6, background: section === item.toLowerCase() ? '#f3f4f6' : 'transparent', fontWeight: section === item.toLowerCase() ? 600 : 400, cursor: 'pointer'}}>
              {item}
            </button>
          ))}
        </nav>
      </aside>
      <main style={{flex: 1, padding: 32}}>
        {section === 'general' && (
          <div style={{border: '1px solid #ddd', borderRadius: 8, padding: 24}}>
            <h3>General</h3>
            <label style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Display name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={{padding: 8, borderRadius: 4, border: '1px solid #ccc', width: '100%', marginBottom: 12}} />
            <button style={{padding: '8px 16px', borderRadius: 4, border: 'none', background: '#0066cc', color: '#fff', cursor: 'pointer'}}>Save changes</button>
          </div>
        )}
        {section === 'notifications' && (
          <div style={{border: '1px solid #ddd', borderRadius: 8, padding: 24}}>
            <h3>Notifications</h3>
            <label style={{display: 'flex', alignItems: 'center', gap: 8}}><input type="checkbox" checked={emailNotifs} onChange={(e) => setEmailNotifs(e.target.checked)} /> Email notifications</label>
          </div>
        )}
        {section === 'security' && (
          <div style={{border: '1px solid #ddd', borderRadius: 8, padding: 24}}>
            <h3>Security</h3>
            <p style={{color: '#666'}}>Manage your password and 2FA.</p>
            <button style={{padding: '8px 16px', borderRadius: 4, border: '1px solid #ccc', background: '#fff', cursor: 'pointer'}}>Change password</button>
          </div>
        )}
        {section === 'billing' && (
          <div style={{border: '1px solid #ddd', borderRadius: 8, padding: 24}}>
            <h3>Billing</h3>
            <p style={{color: '#666'}}>View invoices and manage subscription.</p>
          </div>
        )}
      </main>
    </div>
  );
}
