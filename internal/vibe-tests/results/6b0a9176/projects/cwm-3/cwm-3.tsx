// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const ICONS = ['📄', '🎯', '🚀', '💡', '📊', '🎨', '📝', '🔧'];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('📄');
  const [hasCover, setHasCover] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div style={{maxWidth: 800, margin: '0 auto', fontFamily: 'system-ui'}}>
      {hasCover && <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200" alt="Cover" style={{width: '100%', height: 200, objectFit: 'cover'}} />}
      <div style={{padding: 24}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <div style={{position: 'relative'}}>
            <button onClick={() => setShowPicker(!showPicker)} style={{fontSize: 32, background: 'none', border: 'none', cursor: 'pointer'}}>{icon}</button>
            {showPicker && (
              <div style={{position: 'absolute', top: '100%', left: 0, background: '#fff', border: '1px solid #eee', borderRadius: 8, padding: 8, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, zIndex: 10}}>
                {ICONS.map((e) => <button key={e} onClick={() => {setIcon(e); setShowPicker(false);}} style={{fontSize: 20, background: 'none', border: 'none', cursor: 'pointer'}}>{e}</button>)}
              </div>
            )}
          </div>
          <div>
            <h1 style={{margin: 0}}>Untitled</h1>
            <p style={{color: '#999', margin: 0}}>Press / for commands</p>
          </div>
        </div>
        {!hasCover && <button onClick={() => setHasCover(true)} style={{marginTop: 12, background: 'none', border: 'none', color: '#666', cursor: 'pointer'}}>+ Add cover</button>}
      </div>
    </div>
  );
}
