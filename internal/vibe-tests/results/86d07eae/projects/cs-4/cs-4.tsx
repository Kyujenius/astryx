import {useState} from 'react';

const SNACKS = ['Apple', 'Banana', 'Orange', 'Other'];

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');

  return (
    <fieldset style={{border: 'none', padding: 0, maxWidth: 320}}>
      <legend style={{fontWeight: 600, marginBottom: 8}}>Choose a snack</legend>
      {SNACKS.map((snack) => (
        <label key={snack} style={{display: 'block', marginBottom: 6, cursor: 'pointer'}}>
          <input
            type="radio"
            name="snack"
            value={snack}
            checked={selected === snack}
            onChange={() => setSelected(snack)}
            style={{marginRight: 8}}
          />
          {snack}
        </label>
      ))}
      {selected === 'Other' && (
        <div style={{marginTop: 8, display: 'flex', gap: 8}}>
          <input
            type="text"
            placeholder="Type your snack"
            value={customSnack}
            onChange={(e) => setCustomSnack(e.target.value)}
            style={{padding: '6px 10px', border: '1px solid #ccc', borderRadius: 4, flex: 1}}
            autoFocus
          />
          <button
            type="button"
            onClick={() => {}}
            disabled={!customSnack}
            style={{padding: '6px 12px', background: '#333', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}
          >
            Apply
          </button>
        </div>
      )}
    </fieldset>
  );
}
