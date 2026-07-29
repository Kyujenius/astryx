import {useState} from 'react';

const ICONS = ['📄', '🎯', '📋', '🚀', '💡', '📊', '🎨', '⚡'];

export default function NotionPageHeader() {
  const [title, setTitle] = useState('Untitled');
  const [icon, setIcon] = useState('📄');
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div style={{border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden'}}>
      <div style={{width: '100%', height: 200, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <button style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer', backgroundColor: '#fff'}}>
          Add Cover
        </button>
      </div>
      <div style={{padding: 16}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
          <span style={{fontSize: 48, cursor: 'pointer'}} onClick={() => setShowPicker(!showPicker)}>{icon}</span>
          {showPicker && (
            <div style={{display: 'flex', gap: 4, flexWrap: 'wrap'}}>
              {ICONS.map((e) => (
                <button key={e} onClick={() => { setIcon(e); setShowPicker(false); }}
                  style={{fontSize: 24, border: 'none', cursor: 'pointer', backgroundColor: 'transparent'}}>{e}</button>
              ))}
            </div>
          )}
        </div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          style={{width: '100%', fontSize: 32, fontWeight: 700, border: 'none', outline: 'none', marginTop: 8}}
        />
      </div>
    </div>
  );
}
