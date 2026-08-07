import {useState} from 'react';

const steps = ['Personal', 'Contact', 'Review'];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({first: '', last: '', email: '', phone: ''});
  const progress = ((step + 1) / steps.length) * 100;

  return (
    <div style={{maxWidth: 500, margin: '0 auto', padding: 24}}>
      <div style={{height: 8, background: '#e5e7eb', borderRadius: 4, marginBottom: 16}}>
        <div style={{height: '100%', width: `${progress}%`, background: '#3b82f6', borderRadius: 4, transition: 'width 0.3s'}} />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 24}}>
        {steps.map((s, i) => <span key={s} style={{fontSize: 14, fontWeight: i === step ? 600 : 400, color: i === step ? '#3b82f6' : '#9ca3af'}}>{i+1}. {s}</span>)}
      </div>
      <div style={{border: '1px solid #e5e7eb', borderRadius: 8, padding: 24, marginBottom: 16}}>
        <h3 style={{margin: '0 0 16px', fontSize: 18}}>{steps[step]}</h3>
        {step === 0 && (<>
          <label style={{display: 'block', fontSize: 14, marginBottom: 4}}>First name</label>
          <input value={form.first} onChange={e => setForm(f => ({...f, first: e.target.value}))} style={{width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 4, marginBottom: 12}} />
          <label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Last name</label>
          <input value={form.last} onChange={e => setForm(f => ({...f, last: e.target.value}))} style={{width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 4}} />
        </>)}
        {step === 1 && (<>
          <label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Email</label>
          <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} style={{width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 4, marginBottom: 12}} />
          <label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Phone</label>
          <input value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} style={{width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 4}} />
        </>)}
        {step === 2 && <p style={{fontSize: 14}}>{form.first} {form.last} / {form.email} / {form.phone}</p>}
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <button disabled={step === 0} onClick={() => setStep(s => s-1)} style={{padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: 6, background: 'white', cursor: step === 0 ? 'not-allowed' : 'pointer', opacity: step === 0 ? 0.5 : 1}}>Back</button>
        <button onClick={() => step < 2 && setStep(s => s+1)} style={{padding: '8px 16px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>{step === 2 ? 'Submit' : 'Next'}</button>
      </div>
    </div>
  );
}
