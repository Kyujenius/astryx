// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';

const STEPS = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

export default function CheckoutFlow() {
  const [step, setStep] = useState(0);

  return (
    <div style={{maxWidth: 600, margin: '0 auto', padding: 32}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 24}}>
        {STEPS.map((s, i) => (
          <div key={s} style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <div style={{width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, backgroundColor: i <= step ? '#2563eb' : '#e5e7eb', color: i <= step ? 'white' : '#666'}}>{i + 1}</div>
            <span style={{fontSize: 14, color: i <= step ? '#111' : '#999'}}>{s}</span>
          </div>
        ))}
      </div>
      <div style={{border: '1px solid #eee', borderRadius: 8, padding: 24, marginBottom: 24}}>
        {step === 0 && (<div>
          <h3 style={{margin: '0 0 16px'}}>Cart summary</h3>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}><span>Widget Pro x2</span><span>$49.98</span></div>
          <div style={{display: 'flex', justifyContent: 'space-between', padding: '8px 0'}}><span>Gadget Mini</span><span>$19.99</span></div>
          <hr style={{border: 'none', borderTop: '1px solid #eee', margin: '12px 0'}} />
          <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 600}}><span>Total</span><span>$69.97</span></div>
        </div>)}
        {step === 1 && (<div><h3 style={{margin: '0 0 16px'}}>Shipping</h3><input placeholder="Address" style={{width: '100%', padding: 8, marginBottom: 12, border: '1px solid #ddd', borderRadius: 4}} /><input placeholder="City" style={{width: '100%', padding: 8, border: '1px solid #ddd', borderRadius: 4}} /></div>)}
        {step === 2 && (<div><h3 style={{margin: '0 0 16px'}}>Payment</h3><input placeholder="Card number" style={{width: '100%', padding: 8, marginBottom: 12, border: '1px solid #ddd', borderRadius: 4}} /></div>)}
        {step === 3 && (<div style={{textAlign: 'center', padding: 32}}><h3>Order confirmed!</h3><p style={{color: '#666'}}>Thank you for your purchase.</p></div>)}
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <button onClick={() => setStep(s => s - 1)} disabled={step === 0} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: 6, cursor: step === 0 ? 'not-allowed' : 'pointer', backgroundColor: 'white'}}>Back</button>
        {step < 3 && <button onClick={() => setStep(s => s + 1)} style={{padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>{step === 2 ? 'Place order' : 'Continue'}</button>}
      </div>
    </div>
  );
}
