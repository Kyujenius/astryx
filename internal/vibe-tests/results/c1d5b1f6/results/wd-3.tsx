import {useState} from 'react';

type Step = 'welcome' | 'profile' | 'preferences' | 'done';

export default function OnboardingFlow() {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const btn = {padding: '8px 16px', borderRadius: 4, border: 'none', cursor: 'pointer'};
  const primary = {...btn, backgroundColor: '#1976d2', color: '#fff'};
  const ghost = {...btn, backgroundColor: 'transparent', border: '1px solid #ccc'};

  if (step === 'welcome') {
    return (
      <div style={{textAlign: 'center', padding: 48}}>
        <h1 style={{fontSize: 32, marginBottom: 8}}>Welcome</h1>
        <p style={{color: '#666', marginBottom: 24}}>Let us set you up in a few steps.</p>
        <button style={primary} onClick={() => setStep('profile')}>Get Started</button>
      </div>
    );
  }
  if (step === 'profile') {
    return (
      <div style={{padding: 24, maxWidth: 400}}>
        <h2 style={{fontSize: 24, marginBottom: 16}}>Profile Setup</h2>
        <div style={{marginBottom: 12}}>
          <label style={{display: 'block', marginBottom: 4}}>Full Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} style={{width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc'}} />
        </div>
        <div style={{marginBottom: 16}}>
          <label style={{display: 'block', marginBottom: 4}}>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc'}} />
        </div>
        <div style={{display: 'flex', gap: 8}}>
          <button style={ghost} onClick={() => setStep('welcome')}>Back</button>
          <button style={primary} onClick={() => setStep('preferences')}>Next</button>
        </div>
      </div>
    );
  }
  if (step === 'preferences') {
    return (
      <div style={{padding: 24, maxWidth: 400}}>
        <h2 style={{fontSize: 24, marginBottom: 16}}>Preferences</h2>
        <label style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8}}>
          <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} /> Email notifications
        </label>
        <label style={{display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16}}>
          <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} /> Dark mode
        </label>
        <div style={{display: 'flex', gap: 8}}>
          <button style={ghost} onClick={() => setStep('profile')}>Back</button>
          <button style={primary} onClick={() => setStep('done')}>Finish</button>
        </div>
      </div>
    );
  }
  return (
    <div style={{textAlign: 'center', padding: 48}}>
      <h2 style={{fontSize: 24, marginBottom: 8}}>All Done!</h2>
      <p style={{color: '#666', marginBottom: 24}}>Welcome, {name || 'friend'}.</p>
      <button style={primary}>Go to Dashboard</button>
    </div>
  );
}
