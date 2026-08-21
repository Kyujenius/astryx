import {useState} from 'react';

export default function PriceRangeFilter() {
  const [min, setMin] = useState(20);
  const [max, setMax] = useState(80);

  return (
    <div style={{padding: '24px', maxWidth: '400px', fontFamily: 'system-ui'}}>
      <h3 style={{marginBottom: '8px'}}>Price Range</h3>
      <p style={{fontSize: '24px', fontWeight: 600, marginBottom: '16px'}}>${min} - ${max}</p>
      <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        <div>
          <label htmlFor="min-price" style={{display: 'block', marginBottom: '4px'}}>Minimum: ${min}</label>
          <input id="min-price" type="range" min={0} max={200} step={5} value={min} onChange={e => setMin(Math.min(Number(e.target.value), max - 5))} style={{width: '100%'}} />
        </div>
        <div>
          <label htmlFor="max-price" style={{display: 'block', marginBottom: '4px'}}>Maximum: ${max}</label>
          <input id="max-price" type="range" min={0} max={200} step={5} value={max} onChange={e => setMax(Math.max(Number(e.target.value), min + 5))} style={{width: '100%'}} />
        </div>
      </div>
    </div>
  );
}
