import {useState} from 'react';

const steps = ['Personal Info', 'Contact', 'Review'];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div style={{maxWidth: 500, padding: 24, fontFamily: 'system-ui, sans-serif'}}>
      <h2 style={{fontSize: 24, fontWeight: 600, marginBottom: 16}}>Registration</h2>
      <div style={{height: 8, background: '#e5e5e5', borderRadius: 4, marginBottom: 8}}>
        <div style={{height: '100%', width: `${progress}%`, background: '#2563eb', borderRadius: 4, transition: 'width 0.3s'}} />
      </div>
      <p style={{fontSize: 14, color: '#666', marginBottom: 16}}>
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>
      <div style={{border: '1px solid #e5e5e5', borderRadius: 8, padding: 24, marginBottom: 16}}>
        {step === 0 && (
          <label style={{display: 'block'}}>
            <span style={{fontSize: 14, fontWeight: 500}}>Full Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{display: 'block', width: '100%', marginTop: 4, padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6}}
            />
          </label>
        )}
        {step === 1 && (
          <label style={{display: 'block'}}>
            <span style={{fontSize: 14, fontWeight: 500}}>Email Address</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{display: 'block', width: '100%', marginTop: 4, padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6}}
            />
          </label>
        )}
        {step === 2 && (
          <div>
            <p style={{margin: 0}}>Name: {name}</p>
            <p style={{margin: '4px 0 0'}}>Email: {email}</p>
          </div>
        )}
      </div>
      <div style={{display: 'flex', gap: 12}}>
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 6, background: 'white', cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.5 : 1}}
        >
          Back
        </button>
        <button
          onClick={() => { if (step < steps.length - 1) setStep((s) => s + 1); }}
          style={{padding: '8px 16px', border: 'none', borderRadius: 6, background: '#2563eb', color: 'white', cursor: 'pointer'}}
        >
          {step === steps.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}
