import {useState} from 'react';

const icons = ['\ud83d\udcdd', '\ud83d\ude80', '\ud83c\udf1f', '\ud83d\udca1', '\ud83c\udfaf', '\ud83d\udce6', '\ud83c\udf3f', '\ud83d\udd25', '\ud83c\udfa8', '\u2728', '\ud83d\udcda', '\ud83d\udd10'];

export default function PageHeader() {
  const [icon, setIcon] = useState('\ud83d\udcdd');
  const [showPicker, setShowPicker] = useState(false);
  const [coverUrl, setCoverUrl] = useState('');
  const [title, setTitle] = useState('Untitled');
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {coverUrl ? (
        <img src={coverUrl} alt="Cover" style={{width: '100%', height: 200, objectFit: 'cover', borderRadius: 8}} />
      ) : (
        <div style={{width: '100%', height: 200, backgroundColor: '#f5f5f5', borderRadius: 8, padding: 8}}>
          <button onClick={() => setCoverUrl('https://picsum.photos/800/200')} style={{background: 'none', border: '1px solid #ccc', borderRadius: 4, padding: '4px 8px', cursor: 'pointer'}}>Add cover</button>
        </div>
      )}
      <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px'}}>
        <button onClick={() => setShowPicker(!showPicker)} style={{fontSize: 32, background: 'none', border: 'none', cursor: 'pointer'}} aria-label="Change icon">{icon}</button>
        {isEditing ? (
          <input value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => setIsEditing(false)} onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)} autoFocus style={{fontSize: 32, fontWeight: 'bold', border: 'none', outline: 'none', flex: 1}} />
        ) : (
          <h1 style={{fontSize: 32, fontWeight: 'bold', cursor: 'pointer', margin: 0}} onClick={() => setIsEditing(true)}>{title}</h1>
        )}
      </div>
      {showPicker && (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4, padding: 12, border: '1px solid #e0e0e0', borderRadius: 8, margin: '0 16px'}}>
          {icons.map((emoji) => (
            <button key={emoji} onClick={() => { setIcon(emoji); setShowPicker(false); }} style={{fontSize: 24, padding: 8, border: 'none', background: 'none', cursor: 'pointer', borderRadius: 4}}>{emoji}</button>
          ))}
        </div>
      )}
    </div>
  );
}
