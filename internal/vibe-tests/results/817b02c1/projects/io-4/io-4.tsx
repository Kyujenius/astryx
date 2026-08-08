// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);
  const unitPrice = 29.99;
  const total = quantity * unitPrice;

  const decrement = () => setQuantity(q => Math.max(1, q - 1));
  const increment = () => setQuantity(q => Math.min(99, q + 1));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {setQuantity(Math.max(1, Math.min(99, val)));}
  };

  const btnStyle = {width: '32px', height: '32px', borderRadius: '4px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer', fontSize: '16px'};

  return (
    <div style={{width: '280px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
      <label style={{fontWeight: 500}}>Quantity</label>
      <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
        <button style={btnStyle} onClick={decrement} disabled={quantity <= 1}>-</button>
        <input
          type="number"
          value={quantity}
          onChange={handleChange}
          min={1}
          max={99}
          style={{width: '60px', textAlign: 'center', padding: '6px', borderRadius: '4px', border: '1px solid #ccc'}}
        />
        <button style={btnStyle} onClick={increment} disabled={quantity >= 99}>+</button>
      </div>
      <p style={{margin: 0, fontSize: '14px', color: '#666'}}>
        ${unitPrice.toFixed(2)} each - Total: ${total.toFixed(2)}
      </p>
    </div>
  );
}
