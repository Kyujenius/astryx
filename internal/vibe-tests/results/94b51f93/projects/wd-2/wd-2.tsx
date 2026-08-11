// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

const steps = ['Personal Info', 'Contact', 'Review'];

export default function FormWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({name: '', email: '', phone: ''});

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div style={{maxWidth: 400, margin: '0 auto', padding: 24, fontFamily: 'system-ui'}}>
      <h2 style={{marginBottom: 8}}>{steps[currentStep]}</h2>
      <div style={{height: 8, backgroundColor: '#e5e5e5', borderRadius: 4, marginBottom: 8}}>
        <div style={{height: '100%', width: `${progress}%`, backgroundColor: '#0066cc', borderRadius: 4, transition: 'width 0.3s'}} />
      </div>
      <p style={{fontSize: 14, color: '#666', marginBottom: 16}}>Step {currentStep + 1} of {steps.length}</p>

      {currentStep === 0 && (
        <div>
          <label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Full name *</label>
          <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}} />
        </div>
      )}
      {currentStep === 1 && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <div>
            <label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Email *</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}} />
          </div>
          <div>
            <label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Phone</label>
            <input value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}} />
          </div>
        </div>
      )}
      {currentStep === 2 && (
        <div style={{backgroundColor: '#f9f9f9', padding: 12, borderRadius: 6}}>
          <p>Name: {formData.name}</p>
          <p>Email: {formData.email}</p>
          <p>Phone: {formData.phone}</p>
        </div>
      )}

      <div style={{display: 'flex', gap: 8, marginTop: 16}}>
        <button disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)} style={{padding: '8px 16px', border: '1px solid #ccc', borderRadius: 4, cursor: currentStep === 0 ? 'not-allowed' : 'pointer', opacity: currentStep === 0 ? 0.5 : 1}}>Back</button>
        <button onClick={() => currentStep < steps.length - 1 && setCurrentStep(currentStep + 1)} style={{padding: '8px 16px', backgroundColor: '#0066cc', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer'}}>{currentStep === steps.length - 1 ? 'Submit' : 'Next'}</button>
      </div>
    </div>
  );
}
