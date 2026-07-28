// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useCallback} from 'react';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);
  const [isUpdating, setIsUpdating] = useState(false);

  const update = useCallback(async (newVal: number) => {
    const clamped = Math.max(1, Math.min(99, newVal));
    setQuantity(clamped);
    setIsUpdating(true);
    try { await fetch('/api/cart/update', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({quantity: clamped})}); }
    finally { setIsUpdating(false); }
  }, []);

  const btnStyle: React.CSSProperties = {width: 32, height: 32, border: '1px solid #d1d5db', borderRadius: 6, background: 'white', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center'};

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: 16, border: '1px solid #e5e7eb', borderRadius: 8, maxWidth: 240}}>
      <span style={{fontWeight: 500, fontSize: 14}}>Quantity:</span>
      <button style={btnStyle} onClick={() => update(quantity - 1)} disabled={quantity <= 1 || isUpdating} aria-label="Decrease">-</button>
      <input type="number" min={1} max={99} value={quantity} onChange={e => update(Number(e.target.value))} disabled={isUpdating} style={{width: 48, textAlign: 'center', padding: 4, border: '1px solid #d1d5db', borderRadius: 4}} />
      <button style={btnStyle} onClick={() => update(quantity + 1)} disabled={quantity >= 99 || isUpdating} aria-label="Increase">+</button>
    </div>
  );
}
