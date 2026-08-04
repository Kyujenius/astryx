// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

const cartItems = [
  {name: 'Wireless Mouse', price: 29.99, qty: 1},
  {name: 'USB-C Cable', price: 12.99, qty: 2},
];

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shipping, setShipping] = useState({name: '', address: '', city: '', zip: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});

  const total = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const steps: Step[] = ['cart', 'shipping', 'payment', 'confirmation'];

  return (
    <div style={{padding: 32, maxWidth: 600, margin: '0 auto'}}>
      <h2 style={{fontSize: 24, fontWeight: 700, marginBottom: 16}}>Checkout</h2>
      <div style={{display: 'flex', gap: 8, marginBottom: 24}}>
        {steps.map((s) => (
          <button
            key={s}
            onClick={() => setStep(s)}
            style={{padding: '8px 16px', borderRadius: 8, border: step === s ? 'none' : '1px solid #ccc', background: step === s ? '#0064e0' : '#fff', color: step === s ? '#fff' : '#333', cursor: 'pointer', fontWeight: 500, textTransform: 'capitalize'}}
          >{s}</button>
        ))}
      </div>

      {step === 'cart' && (
        <div style={{border: '1px solid #e0e0e0', borderRadius: 12, padding: 24}}>
          <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 16}}>Cart Summary</h3>
          {cartItems.map((item) => (
            <div key={item.name} style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
              <span>{item.name} x{item.qty}</span>
              <span style={{fontWeight: 600}}>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <p style={{fontSize: 18, fontWeight: 700, marginTop: 16}}>Total: ${total.toFixed(2)}</p>
          <button onClick={() => setStep('shipping')} style={{marginTop: 16, padding: '10px 20px', borderRadius: 8, border: 'none', background: '#0064e0', color: '#fff', cursor: 'pointer'}}>Continue to shipping</button>
        </div>
      )}

      {step === 'shipping' && (
        <div style={{border: '1px solid #e0e0e0', borderRadius: 12, padding: 24}}>
          <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 16}}>Shipping Address</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            <input placeholder="Full Name" value={shipping.name} onChange={(e) => setShipping({...shipping, name: e.target.value})} style={{padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc'}} />
            <input placeholder="Address" value={shipping.address} onChange={(e) => setShipping({...shipping, address: e.target.value})} style={{padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc'}} />
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
              <input placeholder="City" value={shipping.city} onChange={(e) => setShipping({...shipping, city: e.target.value})} style={{padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc'}} />
              <input placeholder="ZIP" value={shipping.zip} onChange={(e) => setShipping({...shipping, zip: e.target.value})} style={{padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc'}} />
            </div>
            <button onClick={() => setStep('payment')} style={{padding: '10px 20px', borderRadius: 8, border: 'none', background: '#0064e0', color: '#fff', cursor: 'pointer'}}>Continue to payment</button>
          </div>
        </div>
      )}

      {step === 'payment' && (
        <div style={{border: '1px solid #e0e0e0', borderRadius: 12, padding: 24}}>
          <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 16}}>Payment Details</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            <input placeholder="Card Number" value={payment.card} onChange={(e) => setPayment({...payment, card: e.target.value})} style={{padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc'}} />
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
              <input placeholder="Expiry" value={payment.expiry} onChange={(e) => setPayment({...payment, expiry: e.target.value})} style={{padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc'}} />
              <input placeholder="CVV" value={payment.cvv} onChange={(e) => setPayment({...payment, cvv: e.target.value})} style={{padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc'}} />
            </div>
            <button onClick={() => setStep('confirmation')} style={{padding: '10px 20px', borderRadius: 8, border: 'none', background: '#0064e0', color: '#fff', cursor: 'pointer'}}>Place order</button>
          </div>
        </div>
      )}

      {step === 'confirmation' && (
        <div style={{border: '1px solid #e0e0e0', borderRadius: 12, padding: 24}}>
          <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 16}}>Order Confirmed</h3>
          <p>Your order has been placed. A confirmation email will be sent shortly.</p>
          <p style={{fontSize: 13, color: '#666', marginTop: 8}}>Order total: ${total.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
