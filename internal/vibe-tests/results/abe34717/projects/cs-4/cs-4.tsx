import {useState} from 'react';

export default function SnackSelector() {
  const [snack, setSnack] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('Apple');
  const [customSnack, setCustomSnack] = useState('');

  return (
    <div style={{padding: 16, fontFamily: 'system-ui'}}>
      <label style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Snack</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, background: '#fff', cursor: 'pointer', minWidth: 200, textAlign: 'left'}}
      >
        {snack || 'Select a snack...'}
      </button>
      {isOpen && (
        <div style={{border: '1px solid #ccc', borderRadius: 4, padding: 12, marginTop: 4, maxWidth: 300}}>
          {['Apple', 'Banana', 'Orange', 'Other'].map(option => (
            <label key={option} style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
              <input type="radio" name="snack" value={option} checked={draft === option} onChange={() => setDraft(option)} />
              {option}
            </label>
          ))}
          {draft === 'Other' && (
            <input
              type="text"
              placeholder="Enter your snack..."
              value={customSnack}
              onChange={e => setCustomSnack(e.target.value)}
              style={{width: '100%', padding: '6px 8px', border: '1px solid #ccc', borderRadius: 4, marginBottom: 8}}
            />
          )}
          <button
            onClick={() => { setSnack(draft === 'Other' ? customSnack : draft); setIsOpen(false); }}
            style={{padding: '6px 12px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}
          >Apply</button>
        </div>
      )}
    </div>
  );
}
