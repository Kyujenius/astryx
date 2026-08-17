import {useState} from 'react';

export default function PriceRangeFilter() {
  const [min, setMin] = useState(20);
  const [max, setMax] = useState(80);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 12, padding: 24, maxWidth: 320}}>
      <label style={{fontWeight: 600}}>Price Range</label>
      <div style={{display: 'flex', gap: 12, alignItems: 'center'}}>
        <input type="range" min={0} max={200} step={5} value={min} onChange={(e) => setMin(Math.min(Number(e.target.value), max - 5))} style={{flex: 1}} />
        <input type="range" min={0} max={200} step={5} value={max} onChange={(e) => setMax(Math.max(Number(e.target.value), min + 5))} style={{flex: 1}} />
      </div>
      <p style={{fontSize: 14}}>${min} - ${max}</p>
    </div>
  );
}
