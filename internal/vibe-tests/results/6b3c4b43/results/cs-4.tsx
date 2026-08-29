import {useState} from 'react';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [custom, setCustom] = useState('');
  const [applied, setApplied] = useState<string|null>(null);
  return (
    <div style={{maxWidth: 320, fontFamily: 'system-ui'}}>
      <label style={{display: 'block', marginBottom: 8, fontWeight: 600}}>Choose a snack</label>
      <select value={selected} onChange={e => setSelected(e.target.value)} style={{width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 14}}>
        <option value="">Select a snack...</option>
        <option value="Apple">Apple</option>
        <option value="Banana">Banana</option>
        <option value="Orange">Orange</option>
        <option value="Other">Other</option>
      </select>
      {selected === 'Other' && (
        <div style={{marginTop: 12}}>
          <label style={{display: 'block', marginBottom: 4, fontSize: 14}}>Custom snack</label>
          <input value={custom} onChange={e => setCustom(e.target.value)} placeholder="Enter your snack..." style={{width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 14, boxSizing: 'border-box'}} />
          <button onClick={() => custom.trim() && setApplied(custom)} style={{marginTop: 8, padding: '8px 16px', borderRadius: 6, background: '#0066cc', color: 'white', border: 'none', cursor: 'pointer', fontSize: 14}}>Apply</button>
        </div>
      )}
      {(applied || (selected && selected !== 'Other')) && <p style={{marginTop: 12, fontSize: 14}}>Selected: {applied || selected}</p>}
    </div>
  );
}
