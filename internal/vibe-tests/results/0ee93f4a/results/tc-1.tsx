// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  const bg = isDark ? '#1a1a1a' : '#ffffff';
  const text = isDark ? '#e0e0e0' : '#1a1a1a';
  const cardBg = isDark ? '#2a2a2a' : '#f5f5f5';
  const accent = isDark ? '#4d9fff' : '#0064e0';

  return (
    <div style={{minHeight: '100vh', background: bg, color: text, padding: 32, transition: 'all 0.3s'}}>
      <h2 style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>Theme Switcher</h2>
      <p style={{marginBottom: 16, color: isDark ? '#aaa' : '#666'}}>Current mode: {isDark ? 'dark' : 'light'}</p>
      <button
        onClick={() => setIsDark((d) => !d)}
        style={{padding: '10px 20px', borderRadius: 8, border: 'none', background: accent, color: '#fff', cursor: 'pointer', fontWeight: 500, marginBottom: 24}}
      >{isDark ? 'Switch to Light' : 'Switch to Dark'}</button>
      <div style={{background: cardBg, borderRadius: 12, padding: 24, marginTop: 16}}>
        <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 8}}>Sample Content</h3>
        <p>This content adapts to the current theme mode. Colors, backgrounds, and contrast all switch automatically.</p>
      </div>
    </div>
  );
}
