// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px'}}>
      <label style={{fontWeight: 500}}>
        Choose a snack
        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          style={{display: 'block', width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ccc'}}
        >
          <option value="">Select a snack...</option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
          <option value="other">Other</option>
        </select>
      </label>
      {selected === 'other' && (
        <div style={{display: 'flex', gap: '8px', alignItems: 'flex-end'}}>
          <label style={{flex: 1}}>
            Custom snack
            <input
              type="text"
              value={customSnack}
              onChange={e => setCustomSnack(e.target.value)}
              placeholder="Enter your snack"
              style={{display: 'block', width: '100%', padding: '8px', marginTop: '4px', borderRadius: '4px', border: '1px solid #ccc'}}
            />
          </label>
          <button
            onClick={() => {}}
            style={{padding: '8px 16px', borderRadius: '4px', background: '#0066cc', color: '#fff', border: 'none', cursor: 'pointer'}}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
}
