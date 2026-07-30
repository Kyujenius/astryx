import {useState} from 'react';

const ICONS = ['📄', '🎯', '🚀', '💡', '🎨', '📊', '🔧', '⭐', '📝', '🌟', '🎉', '🏆'];

export default function NotionPageHeader() {
  const [pageIcon, setPageIcon] = useState('📄');
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div style={{width: '100%'}}>
      {coverUrl ? (
        <div style={{width: '100%', height: 200, borderRadius: 8, overflow: 'hidden'}}>
          <img src={coverUrl} alt="Cover" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
      ) : (
        <div style={{width: '100%', height: 200, borderRadius: 8, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <button onClick={() => setCoverUrl('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200')} style={{padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: 6, background: 'white', cursor: 'pointer'}}>Add cover</button>
        </div>
      )}
      <div style={{position: 'relative', marginTop: -40, paddingLeft: 24}}>
        <div style={{position: 'relative', display: 'inline-block'}}>
          <button onClick={() => setShowPicker(!showPicker)} style={{fontSize: 48, background: 'none', border: 'none', cursor: 'pointer'}}>{pageIcon}</button>
          {showPicker && (
            <div style={{position: 'absolute', top: '100%', left: 0, background: 'white', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, zIndex: 10}}>
              {ICONS.map((icon) => (
                <button key={icon} onClick={() => {setPageIcon(icon); setShowPicker(false);}} style={{fontSize: 24, background: 'none', border: 'none', cursor: 'pointer', padding: 4}}>{icon}</button>
              ))}
            </div>
          )}
        </div>
        <h1 style={{fontSize: 32, fontWeight: 700, margin: '12px 0 4px'}}>Untitled</h1>
        <p style={{color: '#6b7280', fontSize: 14}}>Add a description...</p>
      </div>
    </div>
  );
}
