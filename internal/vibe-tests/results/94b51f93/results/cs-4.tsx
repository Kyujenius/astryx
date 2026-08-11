// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function SnackSelector() {
  const [selected, setSelected] = useState('apple');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState<string | null>(null);

  const handleApply = () => {
    const value = selected === 'other' ? customSnack : selected;
    setAppliedSnack(value);
  };

  return (
    <div style={{padding: 16, fontFamily: 'system-ui'}}>
      <fieldset style={{border: 'none', padding: 0}}>
        <legend style={{fontWeight: 600, marginBottom: 8}}>Choose a snack</legend>
        {['apple', 'banana', 'orange', 'other'].map((option) => (
          <label key={option} style={{display: 'block', marginBottom: 8, cursor: 'pointer'}}>
            <input
              type="radio"
              name="snack"
              value={option}
              checked={selected === option}
              onChange={() => setSelected(option)}
              style={{marginRight: 8}}
            />
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </label>
        ))}
      </fieldset>
      {selected === 'other' && (
        <div style={{marginTop: 12}}>
          <label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Custom snack</label>
          <input
            type="text"
            value={customSnack}
            onChange={(e) => setCustomSnack(e.target.value)}
            placeholder="Enter your snack"
            style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, width: '100%'}}
          />
        </div>
      )}
      <button
        onClick={handleApply}
        style={{marginTop: 16, padding: '8px 16px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer'}}
      >
        Apply
      </button>
      {appliedSnack && <p style={{marginTop: 8, color: '#059669'}}>Selected: {appliedSnack}</p>}
    </div>
  );
}
