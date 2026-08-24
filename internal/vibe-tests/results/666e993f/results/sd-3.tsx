import {useState} from 'react';

export default function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid = name.trim() && isEmailValid && isPasswordValid;

  const inputStyle = {width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '14px'};
  const labelStyle = {display: 'block', marginBottom: '4px', fontWeight: 600, fontSize: '14px'};
  const errorStyle = {color: '#dc2626', fontSize: '12px', marginTop: '4px'};

  return (
    <div style={{maxWidth: '400px', padding: '24px', fontFamily: 'system-ui'}}>
      <div style={{marginBottom: '16px'}}>
        <label style={labelStyle}>Full Name *</label>
        <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
      </div>
      <div style={{marginBottom: '16px'}}>
        <label style={labelStyle}>Email *</label>
        <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        {email && !isEmailValid && <p style={errorStyle}>Enter a valid email</p>}
      </div>
      <div style={{marginBottom: '16px'}}>
        <label style={labelStyle}>Password *</label>
        <input style={inputStyle} type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {password && !isPasswordValid && <p style={errorStyle}>Minimum 8 characters</p>}
      </div>
      <button disabled={!isFormValid} style={{padding: '10px 20px', background: isFormValid ? '#2563eb' : '#9ca3af', color: 'white', border: 'none', borderRadius: '6px', cursor: isFormValid ? 'pointer' : 'not-allowed', fontSize: '14px'}}>
        Submit
      </button>
    </div>
  );
}
