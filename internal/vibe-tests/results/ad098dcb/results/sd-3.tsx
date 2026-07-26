// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState, useMemo} from 'react';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => ({
    name: !name.trim() ? 'Name is required' : null,
    email: !email ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? 'Invalid email' : null,
    password: !password ? 'Required' : password.length < 8 ? 'Min 8 characters' : null,
  }), [name, email, password]);

  const isValid = !errors.name && !errors.email && !errors.password;

  const fieldStyle = {width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6};
  const errorStyle = {color: '#dc2626', fontSize: 12, marginTop: 4};

  return (
    <form onSubmit={e => { e.preventDefault(); }} style={{display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400, padding: 24}}>
      <h2 style={{fontSize: 20, fontWeight: 600, margin: 0}}>Create account</h2>
      <div>
        <label style={{fontSize: 14, fontWeight: 500}}>Full name *</label>
        <input value={name} onChange={e => setName(e.target.value)} onBlur={() => setTouched(p => ({...p, name: true}))} style={fieldStyle} />
        {touched.name && errors.name && <p style={errorStyle}>{errors.name}</p>}
      </div>
      <div>
        <label style={{fontSize: 14, fontWeight: 500}}>Email *</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} onBlur={() => setTouched(p => ({...p, email: true}))} style={fieldStyle} />
        {touched.email && errors.email && <p style={errorStyle}>{errors.email}</p>}
      </div>
      <div>
        <label style={{fontSize: 14, fontWeight: 500}}>Password *</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} onBlur={() => setTouched(p => ({...p, password: true}))} style={fieldStyle} />
        {touched.password && errors.password && <p style={errorStyle}>{errors.password}</p>}
      </div>
      <button type="submit" disabled={!isValid} style={{padding: '10px 16px', backgroundColor: isValid ? '#2563eb' : '#94a3b8', color: 'white', border: 'none', borderRadius: 6, cursor: isValid ? 'pointer' : 'not-allowed'}}>Create account</button>
    </form>
  );
}
