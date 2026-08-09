// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const ICONS = ['📄', '📝', '🎯', '🚀', '💡', '📊', '🎨', '🔧', '📚', '⭐', '🏠', '🌟'];
const COVERS = [
  'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=200&fit=crop',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=200&fit=crop',
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&h=200&fit=crop',
];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('📄');
  const [cover, setCover] = useState(COVERS[0]);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <div style={{maxWidth: 720, margin: '0 auto', fontFamily: 'system-ui'}}>
      <img src={cover} alt="Cover" style={{width: '100%', height: 200, objectFit: 'cover', borderRadius: 8}} />
      <button onClick={() => setCover(COVERS[(COVERS.indexOf(cover) + 1) % COVERS.length])} style={{marginTop: 8, padding: '4px 12px', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>
        Change cover
      </button>
      <div style={{display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: 16, position: 'relative'}}>
        <button onClick={() => setPickerOpen(!pickerOpen)} style={{fontSize: 48, background: 'none', border: 'none', cursor: 'pointer', padding: 4}}>
          {icon}
        </button>
        {pickerOpen && (
          <div style={{position: 'absolute', top: 60, left: 0, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4, zIndex: 10}}>
            {ICONS.map((emoji) => (
              <button key={emoji} onClick={() => { setIcon(emoji); setPickerOpen(false); }} style={{fontSize: 24, padding: 4, border: 'none', background: 'none', cursor: 'pointer'}}>
                {emoji}
              </button>
            ))}
          </div>
        )}
        <h1 style={{fontSize: 36, fontWeight: 700, margin: 0}}>Untitled</h1>
      </div>
      <p style={{fontSize: 14, color: '#666', marginTop: 8}}>Click the icon to change it.</p>
    </div>
  );
}
