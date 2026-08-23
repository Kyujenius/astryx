import {useState} from 'react';

const ICONS = ['📄', '🎯', '📚', '💡', '🚀', '🎨', '📝', '🔧', '⭐', '🌈', '🎵', '🌿'];

export default function NotionPageHeader() {
  const [icon, setIcon] = useState('📄');
  const [coverUrl, setCoverUrl] = useState('');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showCoverInput, setShowCoverInput] = useState(false);

  return (
    <div style={{maxWidth: 800, margin: '0 auto'}}>
      {coverUrl ? (
        <div style={{height: 200, backgroundImage: `url(${coverUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 8, position: 'relative'}}>
          <button onClick={() => setShowCoverInput(true)} style={{position: 'absolute', bottom: 8, right: 8, padding: '4px 12px', borderRadius: 4, border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer'}}>Change cover</button>
        </div>
      ) : (
        <div style={{height: 200, backgroundColor: '#f0f0f0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <button onClick={() => setShowCoverInput(true)} style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer'}}>Add cover</button>
        </div>
      )}
      {showCoverInput && (
        <div style={{padding: 12, border: '1px solid #e0e0e0', borderRadius: 8, marginTop: 8, display: 'flex', gap: 8}}>
          <input placeholder="Image URL" value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} style={{flex: 1, padding: 8, border: '1px solid #ccc', borderRadius: 4}} />
          <button onClick={() => setShowCoverInput(false)} style={{padding: '8px 16px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Done</button>
        </div>
      )}
      <div style={{marginTop: -32, marginLeft: 24, position: 'relative'}}>
        <button onClick={() => setShowIconPicker(!showIconPicker)} style={{fontSize: 48, width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 8, border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', cursor: 'pointer'}}>{icon}</button>
      </div>
      {showIconPicker && (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, padding: 12, border: '1px solid #e0e0e0', borderRadius: 8, marginTop: 8}}>
          {ICONS.map((e) => <button key={e} onClick={() => {setIcon(e); setShowIconPicker(false);}} style={{fontSize: 24, padding: 8, border: 'none', cursor: 'pointer', borderRadius: 4, backgroundColor: 'transparent'}}>{e}</button>)}
        </div>
      )}
      <h1 style={{fontSize: 36, fontWeight: 'bold', marginTop: 16, paddingLeft: 24}}>Untitled</h1>
    </div>
  );
}
