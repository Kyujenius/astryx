// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function UserProfile() {
  const [tab, setTab] = useState('overview');

  const tabStyle = (active: boolean) => ({
    padding: '8px 16px',
    border: 'none',
    borderBottom: active ? '2px solid #0066cc' : '2px solid transparent',
    background: 'none',
    cursor: 'pointer',
    fontWeight: active ? 600 : 400,
    color: active ? '#0066cc' : '#666',
  });

  return (
    <div style={{padding: 16, maxWidth: 600, fontFamily: 'system-ui'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16}}>
        <div style={{width: 64, height: 64, borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600}}>JD</div>
        <div>
          <h2 style={{margin: 0, fontSize: 24}}>Jane Doe</h2>
          <p style={{margin: 0, fontSize: 14, color: '#666'}}>Software Engineer</p>
        </div>
      </div>
      <div style={{borderBottom: '1px solid #e5e7eb', marginBottom: 16}}>
        <button onClick={() => setTab('overview')} style={tabStyle(tab === 'overview')}>Overview</button>
        <button onClick={() => setTab('activity')} style={tabStyle(tab === 'activity')}>Activity</button>
        <button onClick={() => setTab('settings')} style={tabStyle(tab === 'settings')}>Settings</button>
      </div>
      <div style={{padding: 16, border: '1px solid #e5e7eb', borderRadius: 8}}>
        {tab === 'overview' && (
          <div>
            <h4 style={{marginTop: 0}}>About</h4>
            <p>Full-stack developer with 5 years of experience.</p>
            <p style={{fontSize: 12, color: '#666'}}>Joined January 2022</p>
          </div>
        )}
        {tab === 'activity' && (
          <div>
            <h4 style={{marginTop: 0}}>Recent Activity</h4>
            <p>Pushed 3 commits to main</p>
            <p>Reviewed PR #142</p>
            <p>Commented on Issue #89</p>
          </div>
        )}
        {tab === 'settings' && (
          <div>
            <h4 style={{marginTop: 0}}>Settings</h4>
            <p>Notification preferences and account settings.</p>
          </div>
        )}
      </div>
    </div>
  );
}
