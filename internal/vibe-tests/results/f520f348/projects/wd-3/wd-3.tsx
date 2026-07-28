// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

type Step = 'welcome' | 'profile' | 'preferences' | 'done';

export default function OnboardingFlow() {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const cardStyle: React.CSSProperties = {maxWidth: 440, margin: '40px auto', padding: 32, border: '1px solid #e5e7eb', borderRadius: 12, background: 'white'};
  const btnPrimary: React.CSSProperties = {padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 500};
  const btnGhost: React.CSSProperties = {padding: '10px 20px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#6b7280'};
  const inputStyle: React.CSSProperties = {width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14};

  return (
    <div style={cardStyle}>
      {step === 'welcome' && (
        <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center'}}>
          <h1 style={{fontSize: 24, fontWeight: 700}}>Welcome</h1>
          <p style={{color: '#6b7280'}}>Let us get you set up.</p>
          <button style={btnPrimary} onClick={() => setStep('profile')}>Get Started</button>
        </div>
      )}
      {step === 'profile' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <h2 style={{fontSize: 20, fontWeight: 600}}>Profile Setup</h2>
          <div><label style={{display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500}}>Full Name</label><input style={inputStyle} value={name} onChange={e => setName(e.target.value)} /></div>
          <div><label style={{display: 'block', marginBottom: 4, fontSize: 14, fontWeight: 500}}>Email</label><input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}><button style={btnGhost} onClick={() => setStep('welcome')}>Back</button><button style={btnPrimary} onClick={() => setStep('preferences')}>Next</button></div>
        </div>
      )}
      {step === 'preferences' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
          <h2 style={{fontSize: 20, fontWeight: 600}}>Preferences</h2>
          <label style={{display: 'flex', alignItems: 'center', gap: 8}}><input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} /> Email notifications</label>
          <label style={{display: 'flex', alignItems: 'center', gap: 8}}><input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} /> Dark mode</label>
          <div style={{display: 'flex', justifyContent: 'flex-end', gap: 8}}><button style={btnGhost} onClick={() => setStep('profile')}>Back</button><button style={btnPrimary} onClick={() => setStep('done')}>Finish</button></div>
        </div>
      )}
      {step === 'done' && (
        <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center'}}>
          <h2 style={{fontSize: 20, fontWeight: 600}}>All Done!</h2>
          <p style={{color: '#6b7280'}}>You are all set, {name || 'friend'}.</p>
        </div>
      )}
    </div>
  );
}
