import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shipping, setShipping] = useState({name: '', address: '', city: '', zip: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});
  const total = 119.97;
  const inputStyle = {padding: 8, borderRadius: 4, border: '1px solid #ccc', width: '100%'};
  const btnStyle = {padding: '10px 20px', borderRadius: 4, border: 'none', background: '#0066cc', color: '#fff', cursor: 'pointer' as const};

  if (step === 'cart') return (
    <div style={{maxWidth: 440, padding: 24, border: '1px solid #ddd', borderRadius: 8}}>
      <h2>Cart Summary</h2>
      <p>Widget Pro x2 - $99.98</p><p>Gadget Lite x1 - $19.99</p>
      <p style={{fontWeight: 700}}>Total: ${total}</p>
      <button onClick={() => setStep('shipping')} style={btnStyle}>Continue to Shipping</button>
    </div>
  );
  if (step === 'shipping') return (
    <div style={{maxWidth: 440, padding: 24, border: '1px solid #ddd', borderRadius: 8}}>
      <h2>Shipping</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        <input placeholder="Full Name" value={shipping.name} onChange={(e) => setShipping({...shipping, name: e.target.value})} style={inputStyle} />
        <input placeholder="Address" value={shipping.address} onChange={(e) => setShipping({...shipping, address: e.target.value})} style={inputStyle} />
        <input placeholder="City" value={shipping.city} onChange={(e) => setShipping({...shipping, city: e.target.value})} style={inputStyle} />
        <input placeholder="ZIP" value={shipping.zip} onChange={(e) => setShipping({...shipping, zip: e.target.value})} style={inputStyle} />
      </div>
      <button onClick={() => setStep('payment')} style={{...btnStyle, marginTop: 12}}>Continue to Payment</button>
    </div>
  );
  if (step === 'payment') return (
    <div style={{maxWidth: 440, padding: 24, border: '1px solid #ddd', borderRadius: 8}}>
      <h2>Payment</h2>
      <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        <input placeholder="Card Number" value={payment.card} onChange={(e) => setPayment({...payment, card: e.target.value})} style={inputStyle} />
        <input placeholder="MM/YY" value={payment.expiry} onChange={(e) => setPayment({...payment, expiry: e.target.value})} style={inputStyle} />
        <input placeholder="CVV" type="password" value={payment.cvv} onChange={(e) => setPayment({...payment, cvv: e.target.value})} style={inputStyle} />
      </div>
      <button onClick={() => setStep('confirmation')} style={{...btnStyle, marginTop: 12}}>Place Order</button>
    </div>
  );
  return (
    <div style={{maxWidth: 440, padding: 24, border: '1px solid #ddd', borderRadius: 8}}>
      <h2>Order Confirmed</h2>
      <p>Thank you! Your order of ${total} will ship to {shipping.city}.</p>
    </div>
  );
}
