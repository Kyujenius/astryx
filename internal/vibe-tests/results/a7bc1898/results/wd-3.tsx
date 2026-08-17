import {useState} from 'react';

type Step = 'welcome' | 'profile' | 'preferences' | 'done';

export default function OnboardingFlow() {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const containerStyle: React.CSSProperties = {maxWidth: 420, margin: '0 auto', padding: 32, border: '1px solid #e5e5e5', borderRadius: 12};
  const buttonStyle: React.CSSProperties = {padding: '10px 20px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500};
  const primaryBtn: React.CSSProperties = {...buttonStyle, background: '#0066ff', color: '#fff'};
  const ghostBtn: React.CSSProperties = {...buttonStyle, background: 'transparent', color: '#333', border: '1px solid #ddd'};
  const inputStyle: React.CSSProperties = {padding: '8px 12px', borderRadius: 6, border: '1px solid #ccc', fontSize: 14, width: '100%'};

  return (
    <div style={containerStyle}>
      {step === 'welcome' && (
        <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center'}}>
          <h1 style={{fontSize: 24, fontWeight: 700}}>Welcome</h1>
          <p style={{color: '#666'}}>Let us get you set up in a few quick steps.</p>
          <button style={primaryBtn} onClick={() => setStep('profile')}>Get Started</button>
        </div>
      )}
      {step === 'profile' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <h2 style={{fontSize: 20, fontWeight: 600}}>Profile Setup</h2>
          <div>
            <label htmlFor="name" style={{display: 'block', marginBottom: 4, fontWeight: 500, fontSize: 14}}>Name</label>
            <input id="name" style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" style={{display: 'block', marginBottom: 4, fontWeight: 500, fontSize: 14}}>Email</label>
            <input id="email" style={inputStyle} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div style={{display: 'flex', gap: 8}}>
            <button style={ghostBtn} onClick={() => setStep('welcome')}>Back</button>
            <button style={primaryBtn} onClick={() => setStep('preferences')}>Next</button>
          </div>
        </div>
      )}
      {step === 'preferences' && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          <h2 style={{fontSize: 20, fontWeight: 600}}>Preferences</h2>
          <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} />
            Enable notifications
          </label>
          <label style={{display: 'flex', alignItems: 'center', gap: 8}}>
            <input type="checkbox" checked={darkMode} onChange={e => setDarkMode(e.target.checked)} />
            Dark mode
          </label>
          <div style={{display: 'flex', gap: 8}}>
            <button style={ghostBtn} onClick={() => setStep('profile')}>Back</button>
            <button style={primaryBtn} onClick={() => setStep('done')}>Finish</button>
          </div>
        </div>
      )}
      {step === 'done' && (
        <div style={{textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center'}}>
          <h2 style={{fontSize: 20, fontWeight: 600}}>All Done!</h2>
          <p style={{color: '#666'}}>You are all set, {name || 'friend'}. Enjoy the app.</p>
        </div>
      )}
    </div>
  );
}
