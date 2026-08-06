import {useState} from 'react';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [custom, setCustom] = useState('');
  const [applied, setApplied] = useState('');

  return (
    <div style={{maxWidth: 320, fontFamily: 'system-ui'}}>
      <label style={{display: 'block', marginBottom: 8, fontWeight: 600}}>Choose a snack</label>
      <select style={{width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc'}} value={selected} onChange={e => setSelected(e.target.value)}>
        <option value="">Select...</option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
        <option value="other">Other</option>
      </select>
      {selected === 'other' && <input style={{width: '100%', padding: 8, marginTop: 8, borderRadius: 4, border: '1px solid #ccc'}} placeholder="Enter your snack..." value={custom} onChange={e => setCustom(e.target.value)} />}
      <button style={{marginTop: 12, padding: '8px 16px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}} disabled={selected === 'other' ? !custom : !selected} onClick={() => setApplied(selected === 'other' ? custom : selected)}>Apply</button>
      {applied && <p style={{marginTop: 8}}>Selected: {applied}</p>}
    </div>
  );
}