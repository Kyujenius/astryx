// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const ICONS = ['\u{1F4DD}', '\u{1F680}', '\u{1F4A1}', '\u{1F3AF}', '\u{2728}', '\u{1F30D}', '\u{1F4DA}', '\u{1F3A8}'];

export default function PageHeader() {
  const [icon, setIcon] = useState('\u{1F4DD}');
  const [showPicker, setShowPicker] = useState(false);
  const [coverUrl, setCoverUrl] = useState('');

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
      {coverUrl ? (
        <div style={{position: 'relative', width: '100%', height: 200, borderRadius: 8, overflow: 'hidden'}}>
          <img src={coverUrl} alt="Cover" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
          <button style={{position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer'}} onClick={() => setCoverUrl('')}>Remove</button>
        </div>
      ) : (
        <div style={{width: '100%', height: 200, background: '#f3f4f6', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <button style={{padding: '8px 16px', background: 'white', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer'}} onClick={() => setCoverUrl('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800')}>Add cover</button>
        </div>
      )}
      <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 16}}>
        <button style={{fontSize: 48, background: 'none', border: 'none', cursor: 'pointer'}} onClick={() => setShowPicker(!showPicker)} aria-label="Change icon">{icon}</button>
        <h1 style={{fontSize: 32, fontWeight: 700, margin: 0}}>Untitled</h1>
      </div>
      {showPicker && (
        <div style={{display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 8, padding: 8, background: 'white', border: '1px solid #e5e7eb', borderRadius: 8}}>
          {ICONS.map(i => <button key={i} style={{fontSize: 24, padding: 8, background: 'none', border: 'none', cursor: 'pointer', borderRadius: 4}} onClick={() => { setIcon(i); setShowPicker(false); }}>{i}</button>)}
        </div>
      )}
    </div>
  );
}
