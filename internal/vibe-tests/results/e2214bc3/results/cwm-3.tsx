import {useState} from 'react';

const icons = ['📄', '🎯', '🚀', '📊', '💡', '🔥', '✨', '📝'];
const covers = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
];

export default function PageHeader() {
  const [icon, setIcon] = useState('📄');
  const [coverIndex, setCoverIndex] = useState(0);
  const [showIconPicker, setShowIconPicker] = useState(false);

  return (
    <div style={{border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', fontFamily: 'system-ui'}}>
      <div style={{height: 192, background: covers[coverIndex], display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end', padding: 12}}>
        <button onClick={() => setCoverIndex((i) => (i + 1) % covers.length)} style={{padding: '4px 12px', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>
          Change cover
        </button>
      </div>
      <div style={{padding: '0 24px 24px'}}>
        <div style={{marginTop: -24, fontSize: 48, cursor: 'pointer'}} onClick={() => setShowIconPicker(!showIconPicker)}>
          {icon}
        </div>
        {showIconPicker && (
          <div style={{display: 'flex', gap: 4, marginTop: 8, flexWrap: 'wrap'}}>
            {icons.map((emoji) => (
              <button key={emoji} onClick={() => { setIcon(emoji); setShowIconPicker(false); }} style={{fontSize: 24, background: 'none', border: '1px solid #e5e7eb', borderRadius: 4, cursor: 'pointer', padding: '4px 8px'}}>
                {emoji}
              </button>
            ))}
          </div>
        )}
        <h1 style={{fontSize: 32, fontWeight: 'bold', marginTop: 16}}>Untitled</h1>
      </div>
    </div>
  );
}
