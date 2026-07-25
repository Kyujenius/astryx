// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const NAV = ['General', 'Notifications', 'Privacy', 'Account'];

export default function SettingsDashboard() {
  const [section, setSection] = useState('General');
  const [dark, setDark] = useState(false);

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui'}}>
      <header style={{borderBottom: '1px solid #eee', padding: '12px 24px'}}><h1 style={{margin: 0, fontSize: 20}}>My App</h1></header>
      <div style={{display: 'flex', flex: 1}}>
        <nav style={{width: 200, borderRight: '1px solid #eee', padding: 16}}>
          {NAV.map((item) => (
            <button key={item} onClick={() => setSection(item)} style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', marginBottom: 4, border: 'none', borderRadius: 4, background: section === item ? '#e8f0fe' : 'transparent', cursor: 'pointer'}}>{item}</button>
          ))}
        </nav>
        <main style={{flex: 1, padding: 24}}>
          <h2>{section} Settings</h2>
          <div style={{border: '1px solid #eee', borderRadius: 8, padding: 16, marginTop: 16}}>
            <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
              <input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} />
              Dark mode
            </label>
          </div>
        </main>
      </div>
    </div>
  );
}
