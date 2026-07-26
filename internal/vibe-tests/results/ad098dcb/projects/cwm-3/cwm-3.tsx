// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';

const ICONS = ['\u{1F4C4}', '\u{1F3AF}', '\u{1F4CA}', '\u{1F680}', '\u{1F4A1}', '\u{1F527}', '\u{1F4DD}', '\u{1F3A8}'];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('\u{1F4C4}');
  const [showPicker, setShowPicker] = useState(false);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);

  return (
    <div>
      <div style={{height: 200, backgroundColor: '#f5f5f5', borderRadius: 8, position: 'relative', overflow: 'hidden'}}>
        {coverUrl && <img src={coverUrl} alt="Cover" style={{width: '100%', height: '100%', objectFit: 'cover'}} />}
        <button onClick={() => setCoverUrl('https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200')} style={{position: 'absolute', top: 12, right: 12, padding: '4px 12px', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: 4, cursor: 'pointer'}}>Change cover</button>
      </div>
      <div style={{display: 'flex', alignItems: 'flex-start', gap: 16, padding: 24}}>
        <div style={{position: 'relative'}}>
          <button onClick={() => setShowPicker(!showPicker)} style={{fontSize: 48, background: 'none', border: 'none', cursor: 'pointer'}}>{icon}</button>
          {showPicker && (
            <div style={{position: 'absolute', top: 56, left: 0, backgroundColor: 'white', border: '1px solid #ddd', borderRadius: 8, padding: 8, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, zIndex: 10}}>
              {ICONS.map(e => <button key={e} onClick={() => { setIcon(e); setShowPicker(false); }} style={{fontSize: 24, background: 'none', border: 'none', cursor: 'pointer', padding: 4}}>{e}</button>)}
            </div>
          )}
        </div>
        <div>
          <h1 style={{margin: 0, fontSize: 32, fontWeight: 700}}>Untitled</h1>
          <p style={{margin: '4px 0 0', color: '#999', fontSize: 14}}>Start writing or press / for commands</p>
        </div>
      </div>
    </div>
  );
}
