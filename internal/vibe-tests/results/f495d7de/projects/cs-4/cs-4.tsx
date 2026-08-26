import {useState} from 'react';

export default function SnackSelector() {
  const [snack, setSnack] = useState('Apple');
  const [custom, setCustom] = useState('');
  const options = ['Apple', 'Banana', 'Orange', 'Other'];

  return (
    <div style={{padding: 24, maxWidth: 320}}>
      <fieldset style={{border: 'none', padding: 0}}>
        <legend style={{fontWeight: 'bold', marginBottom: 8}}>Choose a snack</legend>
        {options.map((opt) => (
          <label key={opt} style={{display: 'block', marginBottom: 6, cursor: 'pointer'}}>
            <input
              type="radio"
              name="snack"
              value={opt}
              checked={snack === opt}
              onChange={() => setSnack(opt)}
              style={{marginRight: 8}}
            />
            {opt}
          </label>
        ))}
      </fieldset>
      {snack === 'Other' && (
        <div style={{marginTop: 12}}>
          <input
            type="text"
            placeholder="Enter custom snack"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            style={{padding: '6px 10px', border: '1px solid #ccc', borderRadius: 4, width: '100%'}}
          />
          <button
            onClick={() => { if (custom.trim()) setSnack(custom.trim()); }}
            disabled={!custom.trim()}
            style={{marginTop: 8, padding: '6px 16px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}
          >
            Apply
          </button>
        </div>
      )}
      <p style={{marginTop: 12, color: '#666'}}>Selected: {snack}</p>
    </div>
  );
}
