import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');

  const tabStyle = (s: Step) => ({padding: '8px 16px', border: 'none', borderBottom: step === s ? '2px solid #3b82f6' : '2px solid transparent', background: 'none', cursor: 'pointer', fontWeight: step === s ? 600 : 400});

  return (
    <div style={{maxWidth: 640, fontFamily: 'system-ui'}}>
      <h1 style={{fontSize: 32, fontWeight: 700, marginBottom: 16}}>Checkout</h1>
      <div style={{borderBottom: '1px solid #e5e7eb', marginBottom: 16}}>
        {(['cart', 'shipping', 'payment', 'confirmation'] as const).map(s => (
          <button key={s} onClick={() => setStep(s)} style={tabStyle(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
        ))}
      </div>

      {step === 'cart' && (
        <div style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 24}}>
          <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 12}}>Cart</h2>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}><span>Widget Pro</span><span>$49.99</span></div>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}><span>Cable</span><span>$12.99</span></div>
          <div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 700, borderTop: '1px solid #e5e7eb', paddingTop: 8}}><span>Total</span><span>$62.98</span></div>
          <button onClick={() => setStep('shipping')} style={{marginTop: 16, padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Continue</button>
        </div>
      )}
      {step === 'shipping' && (
        <div style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 24}}>
          <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 12}}>Shipping</h2>
          <input placeholder="Name" style={{display: 'block', width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6, marginBottom: 8}} />
          <input placeholder="Address" style={{display: 'block', width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6, marginBottom: 8}} />
          <div style={{display: 'flex', gap: 8}}><button onClick={() => setStep('cart')} style={{padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer'}}>Back</button><button onClick={() => setStep('payment')} style={{padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Continue</button></div>
        </div>
      )}
      {step === 'payment' && (
        <div style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 24}}>
          <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 12}}>Payment</h2>
          <select style={{display: 'block', width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6, marginBottom: 8}}><option>Credit Card</option><option>PayPal</option></select>
          <input placeholder="Card number" style={{display: 'block', width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6, marginBottom: 8}} />
          <div style={{display: 'flex', gap: 8}}><button onClick={() => setStep('shipping')} style={{padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: 6, cursor: 'pointer'}}>Back</button><button onClick={() => setStep('confirmation')} style={{padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Place Order</button></div>
        </div>
      )}
      {step === 'confirmation' && (
        <div style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 32, textAlign: 'center'}}>
          <div style={{fontSize: 48}}>✓</div>
          <h2 style={{fontSize: 24, fontWeight: 700}}>Order Confirmed</h2>
          <p style={{color: '#6b7280'}}>Confirmation email sent.</p>
        </div>
      )}
    </div>
  );
}
