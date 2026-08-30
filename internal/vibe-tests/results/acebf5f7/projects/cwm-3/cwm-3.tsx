import React, {useState} from 'react';

const icons = ['\ud83d\udcdd', '\ud83d\ude80', '\ud83c\udf1f', '\ud83d\udca1', '\ud83c\udfaf', '\ud83d\udcda'];

export default function NotionHeader() {
  const [icon, setIcon] = useState('\ud83d\udcdd');
  const [hasCover, setHasCover] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  return (
    <div style={{maxWidth: 720, border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden'}}>
      {hasCover && <div style={{height: 200, background: 'linear-gradient(to right, #60a5fa, #a78bfa)'}} />}
      <div style={{padding: 24}}>
        <div style={{display: 'flex', alignItems: 'flex-start', gap: 12}}>
          <span style={{fontSize: 48, marginTop: -32}}>{icon}</span>
          <div style={{display: 'flex', gap: 8}}>
            <button onClick={() => setShowPicker(!showPicker)} style={{padding: '4px 12px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14}}>{showPicker ? 'Close' : 'Change icon'}</button>
            <button onClick={() => setHasCover(!hasCover)} style={{padding: '4px 12px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 14}}>{hasCover ? 'Remove cover' : 'Add cover'}</button>
          </div>
        </div>
        {showPicker && <div style={{marginTop: 12, padding: 12, background: '#f5f5f5', borderRadius: 6, display: 'flex', flexWrap: 'wrap', gap: 8}}>{icons.map(i => <button key={i} onClick={() => {setIcon(i); setShowPicker(false);}} style={{padding: 8, border: i===icon ? '2px solid #3b82f6' : '1px solid transparent', borderRadius: 4, background: 'white', cursor: 'pointer', fontSize: 20}}>{i}</button>)}</div>}
        <h1 style={{fontSize: 32, fontWeight: 700, marginTop: 16}}>Untitled</h1>
        <p style={{color: '#999', marginTop: 8}}>Start writing or press / for commands...</p>
      </div>
    </div>
  );
}
