// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);

  const containerStyle = {maxWidth: '480px', margin: '0 auto', padding: '24px'};
  const inputStyle = {display: 'block', width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '4px'};
  const btnPrimary = {padding: '8px 16px', borderRadius: '4px', background: '#0066cc', color: '#fff', border: 'none', cursor: 'pointer'};
  const btnGhost = {padding: '8px 16px', borderRadius: '4px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#666'};

  return (
    <div style={containerStyle}>
      {step === 0 && (
        <div style={{textAlign: 'center'}}>
          <h1 style={{fontSize: '28px', marginBottom: '8px'}}>Welcome</h1>
          <p style={{color: '#666', marginBottom: '16px'}}>Let us get you set up with your new account.</p>
          <button style={btnPrimary} onClick={() => setStep(1)}>Get started</button>
        </div>
      )}
      {step === 1 && (
        <div>
          <h2 style={{fontSize: '22px', marginBottom: '16px'}}>Profile Setup</h2>
          <label style={{display: 'block', marginBottom: '12px'}}>
            Name
            <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
          </label>
          <label style={{display: 'block', marginBottom: '16px'}}>
            Email
            <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </label>
          <div style={{display: 'flex', justifyContent: 'flex-end', gap: '8px'}}>
            <button style={btnGhost} onClick={() => setStep(0)}>Back</button>
            <button style={btnPrimary} onClick={() => setStep(2)}>Next</button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 style={{fontSize: '22px', marginBottom: '16px'}}>Preferences</h2>
          <div style={{display: 'flex', gap: '8px', marginBottom: '16px'}}>
            {['light', 'dark', 'system'].map(t => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                style={{...btnPrimary, background: theme === t ? '#0066cc' : '#e5e7eb', color: theme === t ? '#fff' : '#333'}}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <label style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px'}}>
            <input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} />
            Enable notifications
          </label>
          <div style={{display: 'flex', justifyContent: 'flex-end', gap: '8px'}}>
            <button style={btnGhost} onClick={() => setStep(1)}>Back</button>
            <button style={btnPrimary} onClick={() => setStep(3)}>Finish</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div style={{textAlign: 'center'}}>
          <h2 style={{fontSize: '22px', marginBottom: '8px'}}>All done!</h2>
          <p style={{color: '#666', marginBottom: '16px'}}>Your account is ready.</p>
          <button style={btnPrimary}>Go to dashboard</button>
        </div>
      )}
    </div>
  );
}
