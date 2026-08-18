import { useState } from 'react';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  return (
    <form onSubmit={(e) => { e.preventDefault(); alert('Submitted!'); }} style={{ maxWidth: 400, padding: 16 }}>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="name" style={{ display: 'block', fontWeight: 500, marginBottom: 4 }}>Name *</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box' }} />
        {name && !isNameValid && <p style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>Name is required</p>}
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="email" style={{ display: 'block', fontWeight: 500, marginBottom: 4 }}>Email *</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box' }} />
        {email && !isEmailValid && <p style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>Enter a valid email</p>}
      </div>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="password" style={{ display: 'block', fontWeight: 500, marginBottom: 4 }}>Password *</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 8 characters" style={{ width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box' }} />
        {password && !isPasswordValid && <p style={{ color: '#dc2626', fontSize: 12, marginTop: 4 }}>Min 8 characters</p>}
      </div>
      <button type="submit" disabled={!isFormValid} style={{ padding: '10px 20px', background: isFormValid ? '#0066cc' : '#ccc', color: 'white', border: 'none', borderRadius: 4, cursor: isFormValid ? 'pointer' : 'not-allowed' }}>Submit</button>
    </form>
  );
}
