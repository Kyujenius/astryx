import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'done';

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const steps: {id: Step; label: string}[] = [{id: 'cart', label: 'Cart'}, {id: 'shipping', label: 'Shipping'}, {id: 'payment', label: 'Payment'}, {id: 'done', label: 'Done'}];
  const tab = (s: Step) => ({padding: '8px 16px', border: 'none', borderBottom: step === s ? '2px solid #0066ff' : '2px solid transparent', background: 'transparent', cursor: 'pointer', fontWeight: step === s ? 600 : 400});
  const card = {border: '1px solid #eee', borderRadius: 8, padding: 24, marginTop: 16};
  const btn = {width: '100%', marginTop: 16, padding: '10px 0', background: '#0066ff', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'};

  return (
    <div style={{maxWidth: 600, margin: '0 auto', padding: 32}}>
      <h1 style={{fontSize: 28, fontWeight: 700, marginBottom: 16}}>Checkout</h1>
      <div style={{display: 'flex', borderBottom: '1px solid #eee'}}>{steps.map((s) => <button key={s.id} onClick={() => setStep(s.id)} style={tab(s.id)}>{s.label}</button>)}</div>
      {step === 'cart' && (<div style={card}><h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>Cart</h2><div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}><span>Widget Pro x2</span><span>$49.98</span></div><div style={{display: 'flex', justifyContent: 'space-between'}}><span>Gadget Lite</span><span>$19.99</span></div><hr style={{border: 'none', borderTop: '1px solid #eee', margin: '12px 0'}} /><div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 700}}><span>Total</span><span>$69.97</span></div><button onClick={() => setStep('shipping')} style={btn}>Continue</button></div>)}
      {step === 'shipping' && (<div style={card}><h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>Shipping</h2><div style={{marginBottom: 12}}><label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Full name</label><input style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} /></div><div style={{marginBottom: 12}}><label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Address</label><input style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} /></div><button onClick={() => setStep('payment')} style={btn}>Continue</button></div>)}
      {step === 'payment' && (<div style={card}><h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>Payment</h2><div style={{marginBottom: 12}}><label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Card number</label><input placeholder="1234 5678 9012 3456" style={{width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4}} /></div><button onClick={() => setStep('done')} style={btn}>Place Order</button></div>)}
      {step === 'done' && (<div style={{...card, textAlign: 'center'}}><div style={{padding: '8px 12px', background: '#efe', border: '1px solid #cfc', borderRadius: 4, marginBottom: 16}}>Order placed!</div><h2 style={{fontSize: 24, fontWeight: 700}}>Thank you!</h2><p style={{color: '#666'}}>Order #12345 confirmed.</p></div>)}
    </div>
  );
}
