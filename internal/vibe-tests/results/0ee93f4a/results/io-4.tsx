// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);
  const unitPrice = 24.99;

  return (
    <div style={{padding: 24, display: 'flex', flexDirection: 'column', gap: 12}}>
      <label style={{fontWeight: 600, fontSize: 14}}>Quantity</label>
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          style={{width: 36, height: 36, borderRadius: 8, border: '1px solid #ccc', background: '#fff', cursor: 'pointer', fontSize: 18}}
        >-</button>
        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val)) {setQuantity(Math.min(99, Math.max(1, val)));}
          }}
          min={1}
          max={99}
          aria-label="Quantity"
          style={{width: 60, textAlign: 'center', padding: '6px 8px', borderRadius: 8, border: '1px solid #ccc', fontSize: 16}}
        />
        <button
          onClick={() => setQuantity((q) => Math.min(99, q + 1))}
          disabled={quantity >= 99}
          aria-label="Increase quantity"
          style={{width: 36, height: 36, borderRadius: 8, border: '1px solid #ccc', background: '#fff', cursor: 'pointer', fontSize: 18}}
        >+</button>
      </div>
      <p style={{fontSize: 14, color: '#666', margin: 0}}>
        Subtotal: ${(unitPrice * quantity).toFixed(2)}
      </p>
    </div>
  );
}
