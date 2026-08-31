import {useState} from 'react';

const snacks = ['Apple', 'Banana', 'Orange', 'Other'];

export default function SnackSelector() {
  const [snack, setSnack] = useState('');
  const [customSnack, setCustomSnack] = useState('');

  return (
    <div style={{maxWidth: 320, fontFamily: 'system-ui'}}>
      <label style={{display: 'block', marginBottom: 8, fontWeight: 600}}>Choose a snack</label>
      <select
        value={snack}
        onChange={(e) => setSnack(e.target.value)}
        style={{width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc'}}
      >
        <option value="">Select a snack</option>
        {snacks.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      {snack === 'Other' && (
        <div style={{marginTop: 12}}>
          <label style={{display: 'block', marginBottom: 4, fontSize: 14}}>Custom snack</label>
          <input
            type="text"
            value={customSnack}
            onChange={(e) => setCustomSnack(e.target.value)}
            placeholder="Enter your snack"
            style={{width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', boxSizing: 'border-box'}}
          />
          <button
            disabled={!customSnack}
            style={{marginTop: 8, padding: '8px 16px', borderRadius: 4, border: 'none', backgroundColor: customSnack ? '#2563eb' : '#ccc', color: 'white', cursor: customSnack ? 'pointer' : 'default'}}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
