import {useState} from 'react';

export default function SnackSelector() {
  const [snack, setSnack] = useState('Apple');
  const [selection, setSelection] = useState('Apple');
  const [custom, setCustom] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <div style={{position: 'relative', display: 'inline-block'}}>
      <button onClick={() => setOpen(!open)} style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer'}}>
        {snack}
      </button>
      {open && (
        <div style={{position: 'absolute', top: '100%', left: 0, marginTop: 4, padding: 16, border: '1px solid #ccc', borderRadius: 8, backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', zIndex: 10}}>
          <fieldset style={{border: 'none', padding: 0, margin: 0}}>
            <legend style={{fontWeight: 'bold', marginBottom: 8}}>Choose a snack</legend>
            {['Apple', 'Banana', 'Orange', 'Other'].map((opt) => (
              <label key={opt} style={{display: 'block', marginBottom: 4, cursor: 'pointer'}}>
                <input type="radio" name="snack" value={opt} checked={selection === opt} onChange={() => setSelection(opt)} />
                {' '}{opt}
              </label>
            ))}
          </fieldset>
          {selection === 'Other' && (
            <input
              type="text"
              placeholder="Custom snack"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              style={{display: 'block', width: '100%', padding: 8, marginTop: 8, border: '1px solid #ccc', borderRadius: 4}}
            />
          )}
          <button
            onClick={() => {
              setSnack(selection === 'Other' ? custom.trim() || snack : selection);
              setOpen(false);
            }}
            style={{marginTop: 12, padding: '8px 16px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', width: '100%'}}
          >Apply</button>
        </div>
      )}
    </div>
  );
}
