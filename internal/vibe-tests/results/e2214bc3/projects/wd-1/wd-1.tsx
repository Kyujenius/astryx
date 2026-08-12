import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shipping, setShipping] = useState({name: '', address: '', city: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});

  const cardStyle = {maxWidth: 480, margin: '0 auto', padding: 24, border: '1px solid #e5e7eb', borderRadius: 12, fontFamily: 'system-ui'};
  const inputStyle = {width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, marginTop: 4, marginBottom: 12};
  const btnStyle = {padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600};

  return (
    <div style={cardStyle}>
      {step === 'cart' && (
        <div>
          <h2 style={{marginBottom: 16}}>Cart Summary</h2>
          <p>Widget x2 - $29.98</p>
          <p>Gadget x1 - $49.99</p>
          <p style={{fontWeight: 'bold', fontSize: 18, marginTop: 12}}>Total: $79.97</p>
          <button style={{...btnStyle, marginTop: 16}} onClick={() => setStep('shipping')}>Continue to Shipping</button>
        </div>
      )}
      {step === 'shipping' && (
        <div>
          <h2 style={{marginBottom: 16}}>Shipping</h2>
          <label>Full Name<input style={inputStyle} value={shipping.name} onChange={(e) => setShipping(s => ({...s, name: e.target.value}))} /></label>
          <label>Address<input style={inputStyle} value={shipping.address} onChange={(e) => setShipping(s => ({...s, address: e.target.value}))} /></label>
          <label>City<input style={inputStyle} value={shipping.city} onChange={(e) => setShipping(s => ({...s, city: e.target.value}))} /></label>
          <button style={btnStyle} onClick={() => setStep('payment')}>Continue to Payment</button>
        </div>
      )}
      {step === 'payment' && (
        <div>
          <h2 style={{marginBottom: 16}}>Payment</h2>
          <label>Card Number<input style={inputStyle} value={payment.card} onChange={(e) => setPayment(s => ({...s, card: e.target.value}))} /></label>
          <label>Expiry<input style={inputStyle} value={payment.expiry} onChange={(e) => setPayment(s => ({...s, expiry: e.target.value}))} /></label>
          <label>CVV<input style={inputStyle} value={payment.cvv} onChange={(e) => setPayment(s => ({...s, cvv: e.target.value}))} /></label>
          <button style={btnStyle} onClick={() => setStep('confirmation')}>Place Order</button>
        </div>
      )}
      {step === 'confirmation' && (
        <div style={{textAlign: 'center'}}>
          <h2>Order Confirmed</h2>
          <p>Thank you for your purchase.</p>
        </div>
      )}
    </div>
  );
}
