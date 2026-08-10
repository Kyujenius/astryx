// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState('');

  const handleApply = () => {
    const snack = selected === 'other' ? customSnack : selected;
    setAppliedSnack(snack);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 12, padding: 24, maxWidth: 320}}>
      <label style={{fontWeight: 500, fontSize: 14}}>Choose a snack</label>
      <select
        value={selected}
        onChange={e => setSelected(e.target.value)}
        style={{padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14}}
      >
        <option value="">Select a snack...</option>
        <option value="apple">Apple</option>
        <option value="banana">Banana</option>
        <option value="orange">Orange</option>
        <option value="other">Other</option>
      </select>
      {selected === 'other' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <label style={{fontWeight: 500, fontSize: 14}}>Custom snack</label>
          <input
            type="text"
            value={customSnack}
            onChange={e => setCustomSnack(e.target.value)}
            placeholder="Enter your snack..."
            style={{padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14}}
          />
        </div>
      )}
      <button
        onClick={handleApply}
        disabled={selected === '' || (selected === 'other' && customSnack === '')}
        style={{padding: '10px 16px', borderRadius: 6, background: '#2563eb', color: 'white', border: 'none', fontSize: 14, cursor: 'pointer', opacity: (selected === '' || (selected === 'other' && customSnack === '')) ? 0.5 : 1}}
      >
        Apply
      </button>
      {appliedSnack && <p style={{fontSize: 14, color: '#6b7280'}}>Selected snack: {appliedSnack}</p>}
    </div>
  );
}
