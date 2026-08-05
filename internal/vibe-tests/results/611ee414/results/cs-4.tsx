// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState('');

  return (
    <div style={{padding: 16, maxWidth: 400}}>
      <fieldset style={{border: 'none', padding: 0}}>
        <legend style={{fontWeight: 'bold', marginBottom: 8}}>Choose a snack</legend>
        {['Apple', 'Banana', 'Orange', 'Other'].map((opt) => (
          <label key={opt} style={{display: 'block', marginBottom: 4}}>
            <input type="radio" name="snack" value={opt.toLowerCase()} checked={selected === opt.toLowerCase()} onChange={(e) => setSelected(e.target.value)} />
            {' '}{opt}
          </label>
        ))}
      </fieldset>
      {selected === 'other' && (
        <div style={{marginTop: 12}}>
          <input type="text" placeholder="Enter your snack" value={customSnack} onChange={(e) => setCustomSnack(e.target.value)} style={{padding: '6px 8px', border: '1px solid #ccc', borderRadius: 4, marginRight: 8}} />
          <button onClick={() => setAppliedSnack(customSnack.trim())} style={{padding: '6px 12px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Apply</button>
        </div>
      )}
      {appliedSnack && <p style={{marginTop: 8, fontSize: 14}}>Selected: {appliedSnack}</p>}
    </div>
  );
}