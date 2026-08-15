import {useState} from 'react';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState('');

  const handleApply = () => {
    if (customSnack.trim()) {
      setAppliedSnack(customSnack.trim());
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px'}}>
      <div>
        <label htmlFor="snack" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>
          Choose a snack
        </label>
        <select
          id="snack"
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          style={{width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db'}}
        >
          <option value="">Select a snack...</option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
          <option value="other">Other</option>
        </select>
      </div>
      {selected === 'other' && (
        <div style={{display: 'flex', alignItems: 'flex-end', gap: '8px'}}>
          <div style={{flex: 1}}>
            <label htmlFor="custom" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>
              Custom snack
            </label>
            <input
              id="custom"
              type="text"
              value={customSnack}
              onChange={(e) => setCustomSnack(e.target.value)}
              placeholder="Enter your snack..."
              style={{width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db'}}
            />
          </div>
          <button
            onClick={handleApply}
            style={{padding: '8px 16px', borderRadius: '6px', backgroundColor: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer'}}
          >
            Apply
          </button>
        </div>
      )}
      {appliedSnack && (
        <p style={{fontSize: '14px', color: '#6b7280'}}>Your snack: {appliedSnack}</p>
      )}
    </div>
  );
}
