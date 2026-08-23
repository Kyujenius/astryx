import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';
const STEPS: Step[] = ['cart', 'shipping', 'payment', 'confirmation'];

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [shipping, setShipping] = useState({name: '', address: '', city: '', zip: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});
  const ci = STEPS.indexOf(step);
  const next = () => setStep(STEPS[ci + 1]);
  const back = () => setStep(STEPS[ci - 1]);
  const fieldStyle = {display: 'block', width: '100%', padding: 8, marginBottom: 12, border: '1px solid #ccc', borderRadius: 4};
  const btnPrimary = {padding: '10px 20px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'};
  const btnGhost = {padding: '10px 20px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', color: '#666'};

  return (
    <div style={{maxWidth: 500, margin: '0 auto', padding: 24}}>
      <div style={{display: 'flex', gap: 4, marginBottom: 24}}>
        {STEPS.map((_, i) => <div key={i} style={{flex: 1, height: 4, borderRadius: 2, backgroundColor: i <= ci ? '#0066cc' : '#e0e0e0'}} />)}
      </div>
      <div style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 24}}>
        {step === 'cart' && (<><h2>Cart Summary</h2><p>Widget Pro x2 - $49.98</p><p>Gadget Mini x1 - $19.99</p><p style={{fontWeight: 'bold', fontSize: 18}}>Total: $69.97</p><button onClick={next} style={btnPrimary}>Continue to Shipping</button></>)}
        {step === 'shipping' && (<><h2>Shipping</h2><label>Full Name<input style={fieldStyle} value={shipping.name} onChange={(e) => setShipping({...shipping, name: e.target.value})} /></label><label>Address<input style={fieldStyle} value={shipping.address} onChange={(e) => setShipping({...shipping, address: e.target.value})} /></label><label>City<input style={fieldStyle} value={shipping.city} onChange={(e) => setShipping({...shipping, city: e.target.value})} /></label><label>ZIP<input style={fieldStyle} value={shipping.zip} onChange={(e) => setShipping({...shipping, zip: e.target.value})} /></label><div style={{display: 'flex', justifyContent: 'space-between'}}><button onClick={back} style={btnGhost}>Back</button><button onClick={next} style={btnPrimary}>Continue</button></div></>)}
        {step === 'payment' && (<><h2>Payment</h2><label>Card<input style={fieldStyle} value={payment.card} onChange={(e) => setPayment({...payment, card: e.target.value})} /></label><label>Expiry<input style={fieldStyle} value={payment.expiry} onChange={(e) => setPayment({...payment, expiry: e.target.value})} /></label><label>CVV<input style={fieldStyle} value={payment.cvv} onChange={(e) => setPayment({...payment, cvv: e.target.value})} /></label><div style={{display: 'flex', justifyContent: 'space-between'}}><button onClick={back} style={btnGhost}>Back</button><button onClick={next} style={btnPrimary}>Place Order</button></div></>)}
        {step === 'confirmation' && <><h2>Order Confirmed</h2><p>Your order has been placed. Confirmation email sent.</p></>}
      </div>
    </div>
  );
}
