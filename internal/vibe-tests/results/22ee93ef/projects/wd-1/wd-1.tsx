// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const card = {border: '1px solid #e0e0e0', borderRadius: 8, padding: 24, maxWidth: 500};
const input = {width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, fontSize: 14};
const btn = {padding: '10px 20px', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14};
const primary = {...btn, background: '#0066cc', color: '#fff'};
const secondary = {...btn, background: '#f0f0f0', color: '#333'};

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shipping, setShipping] = useState({name: '', address: '', city: '', zip: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});

  if (step === 'cart') {
    return (
      <div style={card}>
        <h2>Cart Summary</h2>
        <div style={{display: 'flex', justifyContent: 'space-between'}}><span>Widget Pro x2</span><span>$49.98</span></div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}><span>Gadget Plus x1</span><span>$29.99</span></div>
        <hr />
        <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 'bold'}}><span>Total</span><span>$79.97</span></div>
        <button style={{...primary, width: '100%', marginTop: 16}} onClick={() => setStep('shipping')}>Continue to Shipping</button>
      </div>
    );
  }

  if (step === 'shipping') {
    return (
      <div style={card}>
        <h2>Shipping</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <label>Full Name<input style={input} value={shipping.name} onChange={e => setShipping(s => ({...s, name: e.target.value}))} /></label>
          <label>Address<input style={input} value={shipping.address} onChange={e => setShipping(s => ({...s, address: e.target.value}))} /></label>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
            <label>City<input style={input} value={shipping.city} onChange={e => setShipping(s => ({...s, city: e.target.value}))} /></label>
            <label>ZIP<input style={input} value={shipping.zip} onChange={e => setShipping(s => ({...s, zip: e.target.value}))} /></label>
          </div>
          <div style={{display: 'flex', gap: 12}}>
            <button style={secondary} onClick={() => setStep('cart')}>Back</button>
            <button style={primary} onClick={() => setStep('payment')}>Continue</button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return (
      <div style={card}>
        <h2>Payment</h2>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <label>Card Number<input style={input} value={payment.card} onChange={e => setPayment(s => ({...s, card: e.target.value}))} /></label>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
            <label>Expiry<input style={input} placeholder="MM/YY" value={payment.expiry} onChange={e => setPayment(s => ({...s, expiry: e.target.value}))} /></label>
            <label>CVV<input style={input} value={payment.cvv} onChange={e => setPayment(s => ({...s, cvv: e.target.value}))} /></label>
          </div>
          <div style={{display: 'flex', gap: 12}}>
            <button style={secondary} onClick={() => setStep('shipping')}>Back</button>
            <button style={primary} onClick={() => setStep('confirmation')}>Place Order</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{...card, textAlign: 'center' as const}}>
      <h2>Order Confirmed</h2>
      <p>Your order has been placed. Confirmation email coming shortly.</p>
      <p style={{color: '#666', fontSize: 14}}>Order #ORD-2026-0803</p>
    </div>
  );
}
