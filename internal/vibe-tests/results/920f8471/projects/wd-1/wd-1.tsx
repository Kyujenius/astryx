import {useState} from 'react';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmation';
const STEPS: Step[] = ['cart', 'shipping', 'payment', 'confirmation'];

export default function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState<Step>('cart');
  const stepIndex = STEPS.indexOf(currentStep);

  const next = () => { if (stepIndex < 3) setCurrentStep(STEPS[stepIndex + 1]); };
  const back = () => { if (stepIndex > 0) setCurrentStep(STEPS[stepIndex - 1]); };

  const inputStyle = {width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, marginBottom: 12};
  const btnStyle = {padding: '10px 20px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' as const};

  return (
    <div style={{maxWidth: 500, margin: '0 auto', padding: 24}}>
      <div style={{display: 'flex', gap: 8, marginBottom: 24}}>
        {STEPS.map((s, i) => (
          <div key={s} style={{
            width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: i <= stepIndex ? '#0066cc' : '#e0e0e0', color: i <= stepIndex ? '#fff' : '#333', fontSize: 14,
          }}>{i + 1}</div>
        ))}
      </div>

      <div style={{border: '1px solid #e0e0e0', borderRadius: 8, padding: 24, marginBottom: 16}}>
        {currentStep === 'cart' && <><h2>Cart Summary</h2><p>Review your items.</p></>}
        {currentStep === 'shipping' && (
          <>
            <h2>Shipping</h2>
            <input style={inputStyle} placeholder="Full Name" />
            <input style={inputStyle} placeholder="Address" />
            <input style={inputStyle} placeholder="City" />
            <input style={inputStyle} placeholder="Zip Code" />
          </>
        )}
        {currentStep === 'payment' && (
          <>
            <h2>Payment</h2>
            <input style={inputStyle} placeholder="Card Number" />
            <input style={inputStyle} placeholder="MM/YY" />
            <input style={inputStyle} placeholder="CVC" />
          </>
        )}
        {currentStep === 'confirmation' && <><h2>Order Confirmed</h2><p>Thank you!</p></>}
      </div>

      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        {stepIndex > 0 && currentStep !== 'confirmation' && (
          <button onClick={back} style={{...btnStyle, backgroundColor: '#fff', color: '#333', border: '1px solid #ccc'}}>Back</button>
        )}
        {currentStep !== 'confirmation' && (
          <button onClick={next} style={btnStyle}>{currentStep === 'payment' ? 'Place Order' : 'Continue'}</button>
        )}
      </div>
    </div>
  );
}
