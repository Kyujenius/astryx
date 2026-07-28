// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function SettingsPage() {
  const [name, setName] = useState('');
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [theme, setTheme] = useState('system');

  const inputStyle: React.CSSProperties = {width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14};
  const selectStyle: React.CSSProperties = {width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14, background: 'white'};

  return (
    <div style={{maxWidth: 560, margin: '32px auto', display: 'flex', flexDirection: 'column', gap: 32}}>
      <h1 style={{fontSize: 28, fontWeight: 700}}>Settings</h1>

      <section style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <h2 style={{fontSize: 20, fontWeight: 600}}>Profile</h2>
        <p style={{fontSize: 14, color: '#6b7280', margin: 0}}>Manage your personal information.</p>
        <div><label style={{display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4}}>Display Name</label><input style={inputStyle} value={name} onChange={e => setName(e.target.value)} /></div>
        <div><label style={{display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4}}>Language</label><select style={selectStyle}><option>English</option><option>Spanish</option><option>French</option></select></div>
      </section>

      <section style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <h2 style={{fontSize: 20, fontWeight: 600}}>Notifications</h2>
        <p style={{fontSize: 14, color: '#6b7280', margin: 0}}>Choose how to be notified.</p>
        <label style={{display: 'flex', alignItems: 'center', gap: 8}}><input type="checkbox" checked={emailNotifs} onChange={e => setEmailNotifs(e.target.checked)} /> Email notifications</label>
        <label style={{display: 'flex', alignItems: 'center', gap: 8}}><input type="checkbox" checked={pushNotifs} onChange={e => setPushNotifs(e.target.checked)} /> Push notifications</label>
      </section>

      <section style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <h2 style={{fontSize: 20, fontWeight: 600}}>Appearance</h2>
        <p style={{fontSize: 14, color: '#6b7280', margin: 0}}>Adjust visual preferences.</p>
        <div><label style={{display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4}}>Theme</label><select style={selectStyle} value={theme} onChange={e => setTheme(e.target.value)}><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></div>
      </section>
    </div>
  );
}
