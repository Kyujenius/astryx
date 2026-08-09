// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [applied, setApplied] = useState('');

  return (
    <div style={{padding: 16, maxWidth: 400, fontFamily: 'system-ui'}}>
      <fieldset style={{border: 'none', padding: 0, margin: 0}}>
        <legend style={{fontWeight: 600, marginBottom: 8}}>Choose a snack</legend>
        {['Apple', 'Banana', 'Orange', 'Other'].map((option) => (
          <label key={option} style={{display: 'block', marginBottom: 8, cursor: 'pointer'}}>
            <input
              type="radio"
              name="snack"
              value={option.toLowerCase()}
              checked={selected === option.toLowerCase()}
              onChange={(e) => setSelected(e.target.value)}
              style={{marginRight: 8}}
            />
            {option}
          </label>
        ))}
      </fieldset>
      {selected === 'other' && (
        <div style={{marginTop: 12}}>
          <label style={{display: 'block', marginBottom: 4, fontSize: 14}}>Custom snack</label>
          <input
            type="text"
            value={customSnack}
            onChange={(e) => setCustomSnack(e.target.value)}
            placeholder="Enter your snack"
            style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, width: '100%', boxSizing: 'border-box'}}
          />
          <button
            disabled={!customSnack}
            onClick={() => setApplied(customSnack)}
            style={{marginTop: 8, padding: '8px 16px', backgroundColor: customSnack ? '#0066cc' : '#ccc', color: '#fff', border: 'none', borderRadius: 4, cursor: customSnack ? 'pointer' : 'not-allowed'}}
          >
            Apply
          </button>
        </div>
      )}
      {applied && <p style={{marginTop: 12, color: '#16a34a', fontSize: 14}}>Selected snack: {applied}</p>}
    </div>
  );
}
