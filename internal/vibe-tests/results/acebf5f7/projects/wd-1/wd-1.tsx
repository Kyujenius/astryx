import React, {useState} from 'react';

type Step = 'cart'|'shipping'|'payment'|'confirmation';
const steps: {key:Step;label:string}[] = [{key:'cart',label:'Cart'},{key:'shipping',label:'Shipping'},{key:'payment',label:'Payment'},{key:'confirmation',label:'Confirmation'}];

export default function CheckoutFlow() {
  const [step, setStep] = useState<Step>('cart');
  const [name, setName] = useState('');
  const [addr, setAddr] = useState('');
  const [card, setCard] = useState('');
  const si = steps.findIndex(s => s.key === step);
  const inputStyle = {width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', fontSize: 14, boxSizing: 'border-box' as const};
  return (
    <div style={{maxWidth: 560, padding: 24, border: '1px solid #ddd', borderRadius: 8}}>
      <div style={{display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16}}>
        {steps.map((s,i) => <React.Fragment key={s.key}><span style={{fontSize: 12, padding: '2px 10px', borderRadius: 12, background: i===si ? '#3b82f6' : i<si ? '#dcfce7' : '#f5f5f5', color: i===si ? 'white' : i<si ? '#16a34a' : '#888'}}>{s.label}</span>{i<steps.length-1 && <span style={{color:'#ccc'}}>-</span>}</React.Fragment>)}
      </div>
      <hr style={{border: 'none', borderTop: '1px solid #eee', marginBottom: 16}} />
      {step==='cart' && <div><h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 12}}>Cart Summary</h2><div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}><span>Wireless Headphones x1</span><span style={{fontWeight: 600}}>$299.99</span></div><div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}><span>USB-C Cable x2</span><span style={{fontWeight: 600}}>$19.98</span></div><hr style={{border: 'none', borderTop: '1px solid #eee', margin: '8px 0'}} /><div style={{display: 'flex', justifyContent: 'space-between', fontWeight: 700}}><span>Total</span><span>$319.97</span></div></div>}
      {step==='shipping' && <div><h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 12}}>Shipping</h2><div style={{marginBottom: 12}}><label style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Full Name</label><input value={name} onChange={e=>setName(e.target.value)} style={inputStyle} /></div><div style={{marginBottom: 12}}><label style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Address</label><input value={addr} onChange={e=>setAddr(e.target.value)} style={inputStyle} /></div></div>}
      {step==='payment' && <div><h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 12}}>Payment</h2><div style={{marginBottom: 12}}><label style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Card Number</label><input value={card} onChange={e=>setCard(e.target.value)} style={inputStyle} /></div></div>}
      {step==='confirmation' && <div style={{textAlign: 'center'}}><h2 style={{fontSize: 20, fontWeight: 600}}>Order Confirmed</h2><p style={{color: '#888'}}>Your order has been placed.</p></div>}
      <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16}}>{si>0 && step!=='confirmation' && <button onClick={()=>setStep(steps[si-1].key)} style={{padding: '8px 16px', border: 'none', background: 'transparent', cursor: 'pointer'}}>Back</button>}{step!=='confirmation' && <button onClick={()=>setStep(steps[si+1].key)} style={{padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer'}}>{si===steps.length-2?'Place Order':'Continue'}</button>}</div>
    </div>
  );
}
