import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const steps: Step[] = ['cart', 'shipping', 'payment', 'confirmation'];
  const currentIndex = steps.indexOf(step);

  const cardStyle: React.CSSProperties = {background: 'white', border: '1px solid #e5e5e5', borderRadius: 12, padding: 24};
  const btnStyle: React.CSSProperties = {padding: '10px 20px', background: '#2563eb', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500};
  const ghostBtn: React.CSSProperties = {...btnStyle, background: 'transparent', color: '#333', border: '1px solid #ccc'};
  const inputStyle: React.CSSProperties = {width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6, boxSizing: 'border-box' as const};

  return (
    <div style={{padding: 24, maxWidth: 500, margin: '0 auto', fontFamily: 'system-ui'}}>
      <div style={{display: 'flex', gap: 8, marginBottom: 24}}>
        {steps.map((s, i) => (
          <span key={s} style={{padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 500, background: i <= currentIndex ? '#2563eb' : '#e5e5e5', color: i <= currentIndex ? 'white' : '#666'}}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </span>
        ))}
      </div>

      {step === 'cart' && (
        <div style={cardStyle}>
          <h2 style={{margin: '0 0 16px', fontSize: 20}}>Cart Summary</h2>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}><span>Widget Pro × 2</span><strong>$59.98</strong></div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}><span>Gadget Lite × 1</span><strong>$24.99</strong></div>
          <hr style={{border: 'none', borderTop: '1px solid #eee', margin: '16px 0'}} />
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 16}}><strong>Total</strong><strong>$84.97</strong></div>
          <button style={btnStyle} onClick={() => setStep('shipping')}>Continue to Shipping</button>
        </div>
      )}

      {step === 'shipping' && (
        <div style={cardStyle}>
          <h2 style={{margin: '0 0 16px', fontSize: 20}}>Shipping Address</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            <label>Full Name<input style={inputStyle} placeholder="Jane Doe" /></label>
            <label>Address<input style={inputStyle} placeholder="123 Main St" /></label>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
              <label>City<input style={inputStyle} placeholder="San Francisco" /></label>
              <label>Zip<input style={inputStyle} placeholder="94105" /></label>
            </div>
            <div style={{display: 'flex', gap: 8}}>
              <button style={ghostBtn} onClick={() => setStep('cart')}>Back</button>
              <button style={btnStyle} onClick={() => setStep('payment')}>Continue</button>
            </div>
          </div>
        </div>
      )}

      {step === 'payment' && (
        <div style={cardStyle}>
          <h2 style={{margin: '0 0 16px', fontSize: 20}}>Payment</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            <label>Card Number<input style={inputStyle} placeholder="4242 4242 4242 4242" /></label>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
              <label>Expiry<input style={inputStyle} placeholder="MM/YY" /></label>
              <label>CVC<input style={inputStyle} placeholder="123" /></label>
            </div>
            <div style={{display: 'flex', gap: 8}}>
              <button style={ghostBtn} onClick={() => setStep('shipping')}>Back</button>
              <button style={btnStyle} onClick={() => setStep('confirmation')}>Place Order</button>
            </div>
          </div>
        </div>
      )}

      {step === 'confirmation' && (
        <div style={{...cardStyle, textAlign: 'center' as const}}>
          <h2 style={{margin: '0 0 8px', fontSize: 20}}>Order Confirmed!</h2>
          <p style={{color: '#666'}}>Your order has been placed. Confirmation email incoming.</p>
          <p style={{fontSize: 13, color: '#999'}}>Order #ORD-2026-0842</p>
        </div>
      )}
    </div>
  );
}
