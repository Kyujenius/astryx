import {useState} from 'react';

export default function QuantitySelector() {
  const [qty, setQty] = useState(1);
  const update = (n: number) => { const v = Math.max(1, Math.min(99, n)); setQty(v); fetch('/api/cart/update', {method: 'POST', body: JSON.stringify({quantity: v})}); };

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'system-ui'}}>
      <button disabled={qty <= 1} onClick={() => update(qty - 1)} style={{width: 32, height: 32, border: '1px solid #ccc', borderRadius: 4}}>-</button>
      <input type="number" min={1} max={99} value={qty} onChange={e => update(Number(e.target.value))} style={{width: 48, textAlign: 'center', padding: 4, border: '1px solid #ccc', borderRadius: 4}} />
      <button disabled={qty >= 99} onClick={() => update(qty + 1)} style={{width: 32, height: 32, border: '1px solid #ccc', borderRadius: 4}}>+</button>
    </div>
  );
}