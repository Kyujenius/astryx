import {useState} from 'react';

export default function UserProfile() {
  const [tab, setTab] = useState('overview');

  const tabStyle = (active: boolean) => ({
    padding: '8px 16px',
    border: 'none',
    borderBottom: active ? '2px solid #2563eb' : '2px solid transparent',
    background: 'none',
    cursor: 'pointer',
    fontWeight: active ? 600 : 400,
    color: active ? '#2563eb' : '#6b7280',
  });

  return (
    <div style={{maxWidth: 640, margin: '0 auto', padding: 24, fontFamily: 'system-ui'}}>
      <h1 style={{margin: 0}}>Jane Doe</h1>
      <p style={{color: '#6b7280', marginTop: 4}}>Software Engineer</p>

      <div style={{display: 'flex', borderBottom: '1px solid #e5e7eb', marginTop: 24}}>
        <button style={tabStyle(tab === 'overview')} onClick={() => setTab('overview')}>Overview</button>
        <button style={tabStyle(tab === 'activity')} onClick={() => setTab('activity')}>Activity</button>
        <button style={tabStyle(tab === 'settings')} onClick={() => setTab('settings')}>Settings</button>
      </div>

      <div style={{padding: 16, border: '1px solid #e5e7eb', borderTop: 'none', borderRadius: '0 0 8px 8px'}}>
        {tab === 'overview' && (
          <div>
            <h3>About</h3>
            <p>Full-stack developer with 5 years of experience.</p>
            <h3>Contact</h3>
            <p>jane.doe@example.com</p>
          </div>
        )}
        {tab === 'activity' && (
          <div>
            <h3>Recent Activity</h3>
            <p>Pushed 3 commits to main</p>
            <p style={{fontSize: 12, color: '#6b7280'}}>2 hours ago</p>
            <p>Opened PR #142</p>
            <p style={{fontSize: 12, color: '#6b7280'}}>5 hours ago</p>
          </div>
        )}
        {tab === 'settings' && (
          <div>
            <h3>Preferences</h3>
            <p>Email notifications: On</p>
            <p>Theme: System default</p>
          </div>
        )}
      </div>
    </div>
  );
}
