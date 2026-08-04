// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isNameValid = name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  if (submitted) {
    return (
      <div style={{padding: 32}}>
        <h2 style={{fontSize: 24, fontWeight: 700}}>Success</h2>
        <p>Your account has been created.</p>
      </div>
    );
  }

  return (
    <div style={{padding: 32, maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16}}>
      <h2 style={{fontSize: 24, fontWeight: 700, margin: 0}}>Create Account</h2>
      <div>
        <label style={{display: 'block', fontWeight: 500, marginBottom: 4, fontSize: 14}}>Full Name *</label>
        <input value={name} onChange={(e) => setName(e.target.value)} style={{width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 14}} />
        {name.length > 0 && !isNameValid && <p style={{fontSize: 12, color: '#d32f2f', margin: '4px 0 0'}}>Name must be at least 2 characters</p>}
      </div>
      <div>
        <label style={{display: 'block', fontWeight: 500, marginBottom: 4, fontSize: 14}}>Email *</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 14}} />
        {email.length > 0 && !isEmailValid && <p style={{fontSize: 12, color: '#d32f2f', margin: '4px 0 0'}}>Enter a valid email address</p>}
      </div>
      <div>
        <label style={{display: 'block', fontWeight: 500, marginBottom: 4, fontSize: 14}}>Password *</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 14}} />
        {password.length > 0 && !isPasswordValid && <p style={{fontSize: 12, color: '#d32f2f', margin: '4px 0 0'}}>Password must be at least 8 characters</p>}
      </div>
      <button
        onClick={() => setSubmitted(true)}
        disabled={!isFormValid}
        style={{padding: '12px 24px', borderRadius: 8, border: 'none', background: isFormValid ? '#0064e0' : '#ccc', color: '#fff', cursor: isFormValid ? 'pointer' : 'not-allowed', fontWeight: 500}}
      >Create account</button>
    </div>
  );
}
