import {useState} from 'react';

export default function SettingsPage() {
  const [displayName, setDisplayName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('utc');

  const inputStyle = {width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', boxSizing: 'border-box' as const};
  const sectionStyle = {border: '1px solid #e0e0e0', borderRadius: '8px', padding: '24px'};

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px', maxWidth: '600px', fontFamily: 'system-ui'}}>
      <h1>Settings</h1>

      <div style={sectionStyle}>
        <h2 style={{marginTop: 0}}>Profile</h2>
        <p style={{color: '#666', fontSize: '14px'}}>Manage your personal information and how others see you.</p>
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px'}}>
          <div>
            <label htmlFor="name" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Display Name</label>
            <input id="name" value={displayName} onChange={e => setDisplayName(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label htmlFor="email" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={{marginTop: 0}}>Notifications</h2>
        <p style={{color: '#666', fontSize: '14px'}}>Choose how you want to be notified about activity.</p>
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px'}}>
          <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
            <input type="checkbox" checked={emailNotifications} onChange={e => setEmailNotifications(e.target.checked)} />
            Email notifications
          </label>
          <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
            <input type="checkbox" checked={pushNotifications} onChange={e => setPushNotifications(e.target.checked)} />
            Push notifications
          </label>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={{marginTop: 0}}>Preferences</h2>
        <p style={{color: '#666', fontSize: '14px'}}>Set your language and regional preferences.</p>
        <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px'}}>
          <div>
            <label htmlFor="lang" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Language</label>
            <select id="lang" value={language} onChange={e => setLanguage(e.target.value)} style={inputStyle}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div>
            <label htmlFor="tz" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>Timezone</label>
            <select id="tz" value={timezone} onChange={e => setTimezone(e.target.value)} style={inputStyle}>
              <option value="utc">UTC</option>
              <option value="est">Eastern</option>
              <option value="pst">Pacific</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
