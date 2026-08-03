// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const ICONS = ['\u{1F4C4}', '\u{1F3AF}', '\u{1F4A1}', '\u{1F680}', '\u{1F4CA}', '\u{1F3A8}', '\u{1F527}', '\u{1F4DD}', '\u{1F31F}', '\u{1F3B5}'];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('\u{1F4C4}');
  const [showPicker, setShowPicker] = useState(false);
  const [coverUrl, setCoverUrl] = useState('');

  return (
    <div style={{maxWidth: 800}}>
      {coverUrl && <div style={{width: '100%', height: 200, overflow: 'hidden', borderRadius: 8}}><img src={coverUrl} alt="Cover" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>}
      <div style={{padding: 24}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <button onClick={() => setShowPicker(!showPicker)} style={{fontSize: 48, background: 'none', border: 'none', cursor: 'pointer'}} aria-label="Change icon">{icon}</button>
          {!coverUrl && <button onClick={() => setCoverUrl('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop')} style={{background: 'none', border: '1px solid #ddd', borderRadius: 4, padding: '4px 12px', cursor: 'pointer'}}>Add cover</button>}
        </div>
        {showPicker && (
          <div style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 12, display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 8}}>
            {ICONS.map(e => <button key={e} onClick={() => { setIcon(e); setShowPicker(false); }} style={{fontSize: 24, background: 'none', border: 'none', cursor: 'pointer', padding: 4}} aria-label="Select icon">{e}</button>)}
          </div>
        )}
        <h1 style={{fontSize: 36, fontWeight: 'bold', marginTop: 16}}>Untitled</h1>
        <p style={{color: '#999'}}>Start writing or press / for commands</p>
      </div>
    </div>
  );
}
