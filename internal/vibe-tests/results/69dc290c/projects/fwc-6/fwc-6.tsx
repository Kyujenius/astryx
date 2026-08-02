import React, {useState} from 'react';

export default function ShippingMethodSelector() {
  const [method, setMethod] = useState('standard');

  const options = [
    {value: 'standard', label: 'Standard', detail: 'Free - 5-7 business days'},
    {value: 'express', label: 'Express', detail: '$9.99 - 2-3 business days'},
    {value: 'overnight', label: 'Overnight', detail: '$24.99 - Next day delivery'},
  ];

  return (
    <fieldset style={{border: '1px solid #ddd', borderRadius: '8px', padding: '16px', maxWidth: '400px'}}>
      <legend style={{fontWeight: 'bold', fontSize: '16px'}}>Shipping Method</legend>
      {options.map((opt) => (
        <label key={opt.value} style={{display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '6px', cursor: 'pointer', backgroundColor: method === opt.value ? '#f0f4ff' : 'transparent'}}>
          <input
            type="radio"
            name="shipping"
            value={opt.value}
            checked={method === opt.value}
            onChange={(e) => setMethod(e.target.value)}
          />
          <div>
            <div style={{fontWeight: '500'}}>{opt.label}</div>
            <div style={{fontSize: '14px', color: '#666'}}>{opt.detail}</div>
          </div>
        </label>
      ))}
    </fieldset>
  );
}
