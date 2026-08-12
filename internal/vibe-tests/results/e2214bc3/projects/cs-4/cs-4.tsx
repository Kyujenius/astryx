import {useState} from 'react';

export default function SnackSelector() {
  const [snack, setSnack] = useState('');
  const [customSnack, setCustomSnack] = useState('');

  return (
    <div style={{maxWidth: 320, padding: 16, fontFamily: 'system-ui'}}>
      <fieldset style={{border: 'none', padding: 0, margin: 0}}>
        <legend style={{fontWeight: 600, marginBottom: 8}}>Choose a snack</legend>
        {['apple', 'banana', 'orange', 'other'].map((option) => (
          <label key={option} style={{display: 'block', padding: '4px 0', cursor: 'pointer'}}>
            <input
              type="radio"
              name="snack"
              value={option}
              checked={snack === option}
              onChange={(e) => setSnack(e.target.value)}
            />
            {' '}{option.charAt(0).toUpperCase() + option.slice(1)}
          </label>
        ))}
      </fieldset>
      {snack === 'other' && (
        <div style={{marginTop: 12}}>
          <label style={{display: 'block', fontSize: 14, marginBottom: 4}}>
            Custom snack
          </label>
          <input
            type="text"
            value={customSnack}
            onChange={(e) => setCustomSnack(e.target.value)}
            placeholder="Enter your snack"
            style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, width: '100%'}}
          />
          <button
            onClick={() => console.log('Applied:', customSnack)}
            style={{marginTop: 8, padding: '6px 12px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer'}}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
