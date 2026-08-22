import {useState, useRef, useEffect} from 'react';

const icons = ['📄', '🎯', '💡', '🚀', '📊', '🎨', '📝', '🔧', '⚡', '🌟', '📚', '🎵'];

export default function NotionPageHeader() {
  const [selectedIcon, setSelectedIcon] = useState('📄');
  const [coverUrl, setCoverUrl] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) setShowPicker(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
      {coverUrl && (
        <div style={{width: '100%', height: 200, borderRadius: 8, overflow: 'hidden'}}>
          <img src={coverUrl} alt="Cover" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
      )}
      <div style={{display: 'flex', alignItems: 'center', gap: 12, position: 'relative'}}>
        <div ref={pickerRef} style={{position: 'relative'}}>
          <button onClick={() => setShowPicker(!showPicker)} style={{fontSize: 32, background: 'none', border: 'none', cursor: 'pointer', padding: 4}}>
            {selectedIcon}
          </button>
          {showPicker && (
            <div style={{position: 'absolute', top: '100%', left: 0, background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 12, zIndex: 10, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4}}>
              {icons.map((icon) => (
                <button key={icon} onClick={() => { setSelectedIcon(icon); setShowPicker(false); }} style={{fontSize: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 4}}>
                  {icon}
                </button>
              ))}
            </div>
          )}
        </div>
        <h1 style={{fontSize: 36, fontWeight: 700, margin: 0}}>Untitled</h1>
      </div>
      <div>
        <button onClick={() => setCoverUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&h=400&fit=crop')} style={{background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: 14}}>
          Add cover
        </button>
      </div>
    </div>
  );
}
