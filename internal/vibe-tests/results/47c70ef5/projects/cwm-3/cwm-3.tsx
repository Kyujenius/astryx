import {useState} from 'react';

const ICONS = ['📄', '🎯', '📊', '💡', '🚀', '📝', '🎨', '📋', '⚡', '🌟', '🔧', '📦'];

export default function PageHeader() {
  const [icon, setIcon] = useState('📄');
  const [coverUrl, setCoverUrl] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div style={{maxWidth: 800}}>
      {coverUrl ? (
        <img src={coverUrl} alt="Page cover" style={{width: '100%', height: 200, objectFit: 'cover', borderRadius: 8}} />
      ) : (
        <button onClick={() => setCoverUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200')} style={{padding: '4px 12px', border: '1px solid #ddd', borderRadius: 4, background: '#fafafa', cursor: 'pointer', fontSize: 13}}>
          Add cover
        </button>
      )}
      <div style={{display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, position: 'relative'}}>
        <button onClick={() => setShowPicker(!showPicker)} style={{fontSize: 40, background: 'none', border: 'none', cursor: 'pointer', padding: 4}} aria-label="Change icon">
          {icon}
        </button>
        <h1 style={{margin: 0, fontSize: 32}}>Untitled</h1>
        {showPicker && (
          <div style={{position: 'absolute', top: '100%', left: 0, padding: 12, background: '#fff', border: '1px solid #ddd', borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4}}>
            {ICONS.map((e) => (
              <button key={e} onClick={() => { setIcon(e); setShowPicker(false); }} style={{fontSize: 24, background: 'none', border: 'none', cursor: 'pointer', padding: 4, borderRadius: 4}}>
                {e}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
