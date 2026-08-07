import {useState} from 'react';

const icons = ['📄', '🎯', '🚀', '💡', '📊', '🔧', '🎨', '📝', '⚡', '🌟'];
const gradients = ['linear-gradient(135deg, #667eea, #764ba2)', 'linear-gradient(135deg, #f093fb, #f5576c)', 'linear-gradient(135deg, #4facfe, #00f2fe)'];

export default function PageHeader() {
  const [icon, setIcon] = useState('📄');
  const [coverIdx, setCoverIdx] = useState(0);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div style={{borderRadius: 8, overflow: 'hidden', border: '1px solid #e5e7eb'}}>
      <div style={{height: 200, background: gradients[coverIdx]}} />
      <div style={{padding: 24}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, position: 'relative'}}>
          <button onClick={() => setShowPicker(!showPicker)} style={{fontSize: 32, background: 'none', border: 'none', cursor: 'pointer'}}>{icon}</button>
          <button onClick={() => setCoverIdx((coverIdx + 1) % gradients.length)} style={{fontSize: 13, background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280'}}>Change cover</button>
          {showPicker && (
            <div style={{position: 'absolute', top: 44, left: 0, background: 'white', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, zIndex: 10, boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
              {icons.map(e => <button key={e} onClick={() => { setIcon(e); setShowPicker(false); }} style={{fontSize: 20, border: 'none', background: 'none', cursor: 'pointer', padding: 4}}>{e}</button>)}
            </div>
          )}
        </div>
        <h1 style={{margin: 0, fontSize: 36, fontWeight: 700}}>Untitled</h1>
        <p style={{marginTop: 8, color: '#9ca3af'}}>Start typing...</p>
      </div>
    </div>
  );
}
