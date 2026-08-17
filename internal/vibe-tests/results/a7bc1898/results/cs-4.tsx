import {useState} from 'react';

export default function SnackSelector() {
  const [selected, setSelected] = useState('');
  const [customSnack, setCustomSnack] = useState('');
  const [appliedSnack, setAppliedSnack] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    if (value !== 'other') {
      setAppliedSnack(value);
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 300}}>
      <label htmlFor="snack" style={{fontWeight: 600}}>Snack</label>
      <select
        id="snack"
        value={selected}
        onChange={handleChange}
        style={{padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 14}}
      >
        <option value="">Choose a snack</option>
        <option value="Apple">Apple</option>
        <option value="Banana">Banana</option>
        <option value="Orange">Orange</option>
        <option value="other">Other</option>
      </select>
      {selected === 'other' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
          <label htmlFor="custom" style={{fontWeight: 500, fontSize: 14}}>Custom snack</label>
          <input
            id="custom"
            type="text"
            value={customSnack}
            onChange={(e) => setCustomSnack(e.target.value)}
            placeholder="Enter your snack"
            style={{padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 14}}
          />
          <button
            onClick={() => customSnack.trim() && setAppliedSnack(customSnack.trim())}
            style={{padding: '8px 16px', borderRadius: 6, background: '#0066ff', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14}}
          >
            Apply
          </button>
        </div>
      )}
      {appliedSnack && <p style={{fontSize: 14, color: '#666'}}>Selected snack: {appliedSnack}</p>}
    </div>
  );
}
