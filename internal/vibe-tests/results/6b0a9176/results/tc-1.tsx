// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useEffect} from 'react';

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  const bgColor = dark ? '#1a1a1a' : '#fff';
  const textColor = dark ? '#fff' : '#333';
  const cardBg = dark ? '#2d2d2d' : '#f5f5f5';

  return (
    <div style={{minHeight: '100vh', background: bgColor, color: textColor, padding: 32, fontFamily: 'system-ui', transition: 'all 0.3s'}}>
      <div style={{maxWidth: 400, margin: '0 auto'}}>
        <h2>Theme Settings</h2>
        <div style={{background: cardBg, borderRadius: 8, padding: 16, marginTop: 16}}>
          <p>Current: {dark ? 'Dark' : 'Light'} mode</p>
          <button onClick={() => setDark(!dark)} style={{padding: '8px 16px', background: dark ? '#555' : '#eee', color: textColor, border: '1px solid #999', borderRadius: 4, cursor: 'pointer', marginTop: 8}}>
            Switch to {dark ? 'Light' : 'Dark'}
          </button>
        </div>
      </div>
    </div>
  );
}
