import {useState} from 'react';

const STEPS = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

export default function CheckoutFlow() {
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState({name: '', address: '', city: ''});
  const [payment, setPayment] = useState({card: '', expiry: '', cvv: ''});

  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const inputStyle = {padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, width: '100%'};

  return (
    <div style={{maxWidth: 460, display: 'flex', flexDirection: 'column', gap: 16}}>
      <div style={{display: 'flex', gap: 12, fontSize: 14}}>
        {STEPS.map((label, i) => (
          <span key={label} style={{fontWeight: i === step ? 700 : 400, color: i === step ? '#333' : '#999'}}>
            {i + 1}. {label}
          </span>
        ))}
      </div>

      {step === 0 && (
        <div style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 20}}>
          <h3 style={{margin: '0 0 12px', fontSize: 18, fontWeight: 600}}>Cart Summary</h3>
          <p style={{margin: '4px 0'}}>Wireless Headphones x 1 - $79.99</p>
          <p style={{margin: '4px 0'}}>USB-C Hub x 2 - $99.98</p>
          <p style={{margin: '4px 0', fontWeight: 700}}>Total: $179.97</p>
          <button type="button" onClick={next} style={{marginTop: 12, padding: '10px 16px', background: '#333', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer'}}>
            Continue to shipping
          </button>
        </div>
      )}

      {step === 1 && (
        <div style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 20, display: 'flex', flexDirection: 'column', gap: 12}}>
          <h3 style={{margin: 0, fontSize: 18, fontWeight: 600}}>Shipping</h3>
          <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>Full name<input style={inputStyle} value={shipping.name} onChange={(e) => setShipping({...shipping, name: e.target.value})} /></label>
          <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>Address<input style={inputStyle} value={shipping.address} onChange={(e) => setShipping({...shipping, address: e.target.value})} /></label>
          <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>City<input style={inputStyle} value={shipping.city} onChange={(e) => setShipping({...shipping, city: e.target.value})} /></label>
          <div style={{display: 'flex', gap: 8}}>
            <button type="button" onClick={back} style={{padding: '8px 14px', border: '1px solid #ccc', borderRadius: 6, background: 'transparent', cursor: 'pointer'}}>Back</button>
            <button type="button" onClick={next} style={{padding: '8px 14px', background: '#333', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Continue to payment</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 20, display: 'flex', flexDirection: 'column', gap: 12}}>
          <h3 style={{margin: 0, fontSize: 18, fontWeight: 600}}>Payment</h3>
          <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>Card number<input style={inputStyle} value={payment.card} onChange={(e) => setPayment({...payment, card: e.target.value})} /></label>
          <div style={{display: 'flex', gap: 8}}>
            <label style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 4}}>Expiry<input style={inputStyle} value={payment.expiry} onChange={(e) => setPayment({...payment, expiry: e.target.value})} /></label>
            <label style={{width: 80, display: 'flex', flexDirection: 'column', gap: 4}}>CVV<input style={inputStyle} value={payment.cvv} onChange={(e) => setPayment({...payment, cvv: e.target.value})} /></label>
          </div>
          <div style={{display: 'flex', gap: 8}}>
            <button type="button" onClick={back} style={{padding: '8px 14px', border: '1px solid #ccc', borderRadius: 6, background: 'transparent', cursor: 'pointer'}}>Back</button>
            <button type="button" onClick={next} style={{padding: '8px 14px', background: '#333', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Place order</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 20}}>
          <h3 style={{margin: '0 0 8px', fontSize: 18, fontWeight: 600}}>Order Confirmed</h3>
          <p style={{margin: 0}}>Your order has been placed. You will receive a confirmation email shortly.</p>
        </div>
      )}
    </div>
  );
}
