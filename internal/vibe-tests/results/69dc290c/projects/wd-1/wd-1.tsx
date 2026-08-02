import React, {useState} from 'react';

const steps = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

export default function CheckoutFlow() {
  const [step, setStep] = useState(0);

  return (
    <div style={{maxWidth: '600px', margin: '0 auto', padding: '24px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '24px'}}>
        {steps.map((s, i) => (
          <div key={s} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
            <div style={{width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: i <= step ? '#3b82f6' : '#e5e7eb', color: i <= step ? '#fff' : '#666', fontWeight: 'bold'}}>
              {i + 1}
            </div>
            <span style={{fontSize: '14px', color: i <= step ? '#1f2937' : '#9ca3af'}}>{s}</span>
          </div>
        ))}
      </div>

      <div style={{border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', marginBottom: '16px'}}>
        <h2 style={{margin: '0 0 16px'}}>{steps[step]}</h2>
        {step === 0 && <p>Your items are ready for checkout.</p>}
        {step === 1 && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <label>Address<input type="text" style={{display: 'block', width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}} /></label>
            <label>City<input type="text" style={{display: 'block', width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}} /></label>
          </div>
        )}
        {step === 2 && (
          <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
            <label>Card Number<input type="text" style={{display: 'block', width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}} /></label>
            <label>Expiry<input type="text" style={{display: 'block', width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}} /></label>
          </div>
        )}
        {step === 3 && <p>Your order has been placed successfully.</p>}
      </div>

      <div style={{display: 'flex', gap: '12px'}}>
        {step > 0 && <button onClick={() => setStep(step - 1)} style={{padding: '8px 16px', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer'}}>Back</button>}
        {step < 3 && <button onClick={() => setStep(step + 1)} style={{padding: '8px 16px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>{step === 2 ? 'Place Order' : 'Continue'}</button>}
      </div>
    </div>
  );
}
