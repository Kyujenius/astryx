// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';

type Section = 'general' | 'notifications' | 'security';

export default function SettingsDashboard() {
  const [section, setSection] = useState<Section>('general');
  const [name, setName] = useState('John Doe');
  const [notifs, setNotifs] = useState(true);

  return (
    <div style={{display: 'flex', minHeight: '100vh'}}>
      <nav style={{width: 240, borderRight: '1px solid #eee', padding: 16}}>
        <h2 style={{fontSize: 18, fontWeight: 600, marginBottom: 16}}>Settings</h2>
        {(['general', 'notifications', 'security'] as Section[]).map(s => (
          <button key={s} onClick={() => setSection(s)} style={{display: 'block', width: '100%', textAlign: 'left', padding: '8px 12px', border: 'none', borderRadius: 6, cursor: 'pointer', backgroundColor: section === s ? '#f3f4f6' : 'transparent', marginBottom: 4}}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
        ))}
      </nav>
      <main style={{flex: 1, padding: 32, maxWidth: 640}}>
        <h1 style={{fontSize: 24, fontWeight: 700, marginBottom: 24}}>{section.charAt(0).toUpperCase() + section.slice(1)}</h1>
        {section === 'general' && (
          <div style={{border: '1px solid #eee', borderRadius: 8, padding: 24}}>
            <label style={{display: 'block', marginBottom: 16}}><span style={{display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4}}>Name</span><input value={name} onChange={e => setName(e.target.value)} style={{width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6}} /></label>
            <button style={{padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Save</button>
          </div>
        )}
        {section === 'notifications' && (
          <div style={{border: '1px solid #eee', borderRadius: 8, padding: 24}}>
            <label style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}><span>Email notifications</span><input type="checkbox" checked={notifs} onChange={e => setNotifs(e.target.checked)} /></label>
          </div>
        )}
      </main>
    </div>
  );
}
