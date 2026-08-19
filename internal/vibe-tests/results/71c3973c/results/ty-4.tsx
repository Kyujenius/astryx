import {useState} from 'react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);

  const section = {border: '1px solid #eee', borderRadius: 8, padding: 24, marginBottom: 24};
  const row = {display: 'flex' as const, alignItems: 'center' as const, justifyContent: 'space-between' as const, padding: '8px 0'};

  return (
    <div style={{maxWidth: 600, margin: '0 auto', padding: 32}}>
      <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 24}}>Settings</h1>
      <div style={section}>
        <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 4}}>Profile</h2>
        <p style={{color: '#666', fontSize: 14, marginBottom: 16}}>Manage your personal information.</p>
        <div style={{marginBottom: 12}}><label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Display name</label><input style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}} /></div>
        <div><label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Email</label><input type="email" style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}} /></div>
      </div>
      <div style={section}>
        <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 4}}>Appearance</h2>
        <p style={{color: '#666', fontSize: 14, marginBottom: 16}}>Customize how the app looks.</p>
        <div style={row}><span>Dark mode</span><input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} /></div>
        <div style={{marginTop: 12}}><label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Language</label><select style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}}><option value="en">English</option><option value="es">Spanish</option><option value="fr">French</option></select></div>
      </div>
      <div style={section}>
        <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 4}}>Notifications</h2>
        <p style={{color: '#666', fontSize: 14, marginBottom: 16}}>Choose how you want to be notified.</p>
        <div style={row}><span>Email notifications</span><input type="checkbox" checked={emailNotifs} onChange={(e) => setEmailNotifs(e.target.checked)} /></div>
        <div style={row}><span>Push notifications</span><input type="checkbox" checked={pushNotifs} onChange={(e) => setPushNotifs(e.target.checked)} /></div>
      </div>
    </div>
  );
}
