// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = name.trim() !== '' && isEmailValid && password.length >= 8;

  return (
    <form style={{maxWidth: 360, padding: 16, fontFamily: 'system-ui', display: 'flex', flexDirection: 'column', gap: 16}}>
      <h2 style={{margin: 0}}>Create Account</h2>
      <div>
        <label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Name *</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}} />
      </div>
      <div>
        <label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Email *</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}} />
        {email && !isEmailValid && <p style={{color: '#dc2626', fontSize: 12, marginTop: 4}}>Enter a valid email</p>}
      </div>
      <div>
        <label style={{display: 'block', fontSize: 14, marginBottom: 4}}>Password *</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}} />
        {password && password.length < 8 && <p style={{color: '#dc2626', fontSize: 12, marginTop: 4}}>Minimum 8 characters</p>}
      </div>
      <button type="submit" disabled={!isFormValid} style={{padding: '10px 16px', backgroundColor: isFormValid ? '#0066cc' : '#ccc', color: 'white', border: 'none', borderRadius: 4, cursor: isFormValid ? 'pointer' : 'not-allowed'}}>Submit</button>
    </form>
  );
}
