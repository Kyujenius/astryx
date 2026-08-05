// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const EMOJIS = ['\u{1f4dd}', '\u{1f3af}', '\u{1f680}', '\u{1f4a1}', '\u{1f3a8}', '\u{1f4da}'];
const COVERS = ['https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=200&fit=crop', 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=200&fit=crop'];

export default function NotionHeader() {
  const [icon, setIcon] = useState(EMOJIS[0]);
  const [cover, setCover] = useState(COVERS[0]);
  const [title, setTitle] = useState('Untitled');
  const [isEditing, setIsEditing] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [showCovers, setShowCovers] = useState(false);

  return (
    <div style={{fontFamily: 'sans-serif'}}>
      <div style={{height: 200, backgroundImage: `url(${cover})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative'}}>
        <button onClick={() => setShowCovers(!showCovers)} style={{position: 'absolute', bottom: 8, right: 8, padding: '4px 8px', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Change cover</button>
        {showCovers && <div style={{position: 'absolute', bottom: 40, right: 8, background: '#fff', padding: 8, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4}}>
          {COVERS.map((c, i) => <img key={i} src={c} alt="" style={{width: 80, height: 40, objectFit: 'cover', cursor: 'pointer', borderRadius: 4}} onClick={() => { setCover(c); setShowCovers(false); }} />)}
        </div>}
      </div>
      <div style={{padding: '0 48px', marginTop: -32}}>
        <div style={{position: 'relative', display: 'inline-block'}}>
          <button onClick={() => setShowIcons(!showIcons)} style={{fontSize: 48, background: 'none', border: 'none', cursor: 'pointer'}}>{icon}</button>
          {showIcons && <div style={{position: 'absolute', top: '100%', left: 0, background: '#fff', padding: 8, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, zIndex: 10}}>
            {EMOJIS.map((e) => <button key={e} onClick={() => { setIcon(e); setShowIcons(false); }} style={{fontSize: 24, background: 'none', border: 'none', cursor: 'pointer'}}>{e}</button>)}
          </div>}
        </div>
        {isEditing ? <input value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => setIsEditing(false)} autoFocus style={{fontSize: 32, fontWeight: 'bold', border: 'none', outline: 'none', width: '100%'}} /> : <h1 onClick={() => setIsEditing(true)} style={{cursor: 'text'}}>{title}</h1>}
      </div>
    </div>
  );
}