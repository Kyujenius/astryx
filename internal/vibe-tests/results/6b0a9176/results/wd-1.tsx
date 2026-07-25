// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [card, setCard] = useState('');
  const tabStyle = (active: boolean) => ({padding: '8px 16px', border: 'none', background: active ? '#0066cc' : '#eee', color: active ? '#fff' : '#333', cursor: 'pointer', borderRadius: 4});

  return (
    <div style={{maxWidth: 600, margin: '0 auto', padding: 24, fontFamily: 'system-ui'}}>
      <h2>Checkout</h2>
      <div style={{display: 'flex', gap: 8, margin: '16px 0'}}>
        {(['cart', 'shipping', 'payment', 'confirmation'] as Step[]).map((s) => (
          <button key={s} style={tabStyle(step === s)} onClick={() => setStep(s)}>{s}</button>
        ))}
      </div>
      {step === 'cart' && (
        <div style={{border: '1px solid #eee', borderRadius: 8, padding: 16}}>
          <h3>Cart</h3>
          <div style={{display: 'flex', justifyContent: 'space-between'}}><span>Widget x2</span><strong>$49.98</strong></div>
          <hr />
          <div style={{display: 'flex', justifyContent: 'space-between'}}><strong>Total</strong><strong>$49.98</strong></div>
          <button onClick={() => setStep('shipping')} style={{marginTop: 16, padding: '10px 16px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Continue</button>
        </div>
      )}
      {step === 'shipping' && (
        <div style={{border: '1px solid #eee', borderRadius: 8, padding: 16}}>
          <h3>Shipping</h3>
          <label style={{display: 'block', marginBottom: 12}}>Name<input value={name} onChange={(e) => setName(e.target.value)} style={{display: 'block', width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} /></label>
          <label style={{display: 'block', marginBottom: 12}}>Address<input value={address} onChange={(e) => setAddress(e.target.value)} style={{display: 'block', width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} /></label>
          <button onClick={() => setStep('payment')} style={{padding: '10px 16px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Continue</button>
        </div>
      )}
      {step === 'payment' && (
        <div style={{border: '1px solid #eee', borderRadius: 8, padding: 16}}>
          <h3>Payment</h3>
          <label style={{display: 'block', marginBottom: 12}}>Card<input value={card} onChange={(e) => setCard(e.target.value)} style={{display: 'block', width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} /></label>
          <button onClick={() => setStep('confirmation')} style={{padding: '10px 16px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>Place Order</button>
        </div>
      )}
      {step === 'confirmation' && (
        <div style={{border: '1px solid #eee', borderRadius: 8, padding: 16, textAlign: 'center'}}>
          <p style={{color: 'green', fontWeight: 'bold'}}>Order Confirmed!</p>
          <p>Thank you.</p>
        </div>
      )}
    </div>
  );
}
