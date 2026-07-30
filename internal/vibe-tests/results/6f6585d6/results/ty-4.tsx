import {useState} from 'react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div style={{maxWidth: 640, fontFamily: 'system-ui'}}>
      <h1 style={{fontSize: 32, fontWeight: 700, marginBottom: 24}}>Settings</h1>

      <section style={{marginBottom: 32}}>
        <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 4}}>Profile</h2>
        <p style={{color: '#6b7280', fontSize: 14, marginBottom: 16}}>Manage your personal information.</p>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <label style={{display: 'flex', flexDirection: 'column', gap: 4}}><span style={{fontSize: 14, fontWeight: 500}}>Display name</span><input placeholder="Enter your name" style={{padding: 8, border: '1px solid #d1d5db', borderRadius: 6}} /></label>
          <label style={{display: 'flex', flexDirection: 'column', gap: 4}}><span style={{fontSize: 14, fontWeight: 500}}>Email</span><input placeholder="you@example.com" style={{padding: 8, border: '1px solid #d1d5db', borderRadius: 6}} /></label>
        </div>
      </section>

      <section style={{marginBottom: 32}}>
        <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 4}}>Appearance</h2>
        <p style={{color: '#6b7280', fontSize: 14, marginBottom: 16}}>Control the interface.</p>
        <label style={{display: 'flex', alignItems: 'center', gap: 8}}><input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} /> Dark mode</label>
        <label style={{display: 'flex', flexDirection: 'column', gap: 4, marginTop: 12}}><span style={{fontSize: 14, fontWeight: 500}}>Language</span>
          <select style={{padding: 8, border: '1px solid #d1d5db', borderRadius: 6}}><option value="en">English</option><option value="es">Spanish</option><option value="fr">French</option></select>
        </label>
      </section>

      <section>
        <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 4}}>Notifications</h2>
        <p style={{color: '#6b7280', fontSize: 14, marginBottom: 16}}>Choose how to be notified.</p>
        <label style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}><input type="checkbox" defaultChecked /> Email notifications</label>
        <label style={{display: 'flex', alignItems: 'center', gap: 8}}><input type="checkbox" /> Push notifications</label>
      </section>
    </div>
  );
}
