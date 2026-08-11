// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useCallback} from 'react';

interface QuantitySelectorProps {
  itemId?: string;
  initialQuantity?: number;
}

export default function QuantitySelector({itemId = 'item-1', initialQuantity = 1}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const updateQuantity = useCallback(async (newQty: number) => {
    const clamped = Math.min(99, Math.max(1, newQty));
    setQuantity(clamped);
    await fetch('/api/cart/update', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({itemId, quantity: clamped}),
    });
  }, [itemId]);

  const buttonStyle = {width: 32, height: 32, border: '1px solid #ccc', borderRadius: 4, backgroundColor: 'white', cursor: 'pointer', fontSize: 16};

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'system-ui'}}>
      <button onClick={() => updateQuantity(quantity - 1)} disabled={quantity <= 1} style={{...buttonStyle, opacity: quantity <= 1 ? 0.5 : 1}} aria-label="Decrease quantity">-</button>
      <input
        type="number"
        min={1}
        max={99}
        value={quantity}
        onChange={(e) => updateQuantity(parseInt(e.target.value) || 1)}
        aria-label="Quantity"
        style={{width: 48, textAlign: 'center', padding: '4px 8px', border: '1px solid #ccc', borderRadius: 4}}
      />
      <button onClick={() => updateQuantity(quantity + 1)} disabled={quantity >= 99} style={{...buttonStyle, opacity: quantity >= 99 ? 0.5 : 1}} aria-label="Increase quantity">+</button>
    </div>
  );
}
