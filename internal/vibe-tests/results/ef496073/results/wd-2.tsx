import {useState} from 'react';

const steps = ['Personal Info', 'Contact Details', 'Review'];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div style={{maxWidth: 480, border: '1px solid #e5e7eb', borderRadius: 8, padding: 24, fontFamily: 'system-ui'}}>
      <p style={{fontSize: 14, color: '#666', margin: '0 0 8px'}}>Step {step + 1} of {steps.length}</p>
      <div style={{height: 8, backgroundColor: '#e5e7eb', borderRadius: 4, marginBottom: 16}}>
        <div style={{height: '100%', width: `${progress}%`, backgroundColor: '#2563eb', borderRadius: 4, transition: 'width 0.3s'}} />
      </div>
      <h3 style={{margin: '0 0 16px', fontSize: 18, fontWeight: 600}}>{steps[step]}</h3>
      {step === 0 && (
        <div style={{marginBottom: 16}}>
          <label style={{display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500}}>Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" style={{width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', boxSizing: 'border-box'}} />
        </div>
      )}
      {step === 1 && (
        <div style={{marginBottom: 16}}>
          <label style={{display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500}}>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" style={{width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', boxSizing: 'border-box'}} />
        </div>
      )}
      {step === 2 && (
        <div style={{marginBottom: 16}}>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
        </div>
      )}
      <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}>
        {step > 0 && <button onClick={() => setStep(step - 1)} style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4, backgroundColor: 'white', cursor: 'pointer'}}>Back</button>}
        <button onClick={() => step < steps.length - 1 ? setStep(step + 1) : null} style={{padding: '8px 16px', border: 'none', borderRadius: 4, backgroundColor: '#2563eb', color: 'white', cursor: 'pointer'}}>
          {step < steps.length - 1 ? 'Next' : 'Submit'}
        </button>
      </div>
    </div>
  );
}
