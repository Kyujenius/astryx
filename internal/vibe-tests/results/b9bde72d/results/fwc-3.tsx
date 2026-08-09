// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

function getStrength(pw: string) {
  if (!pw) {return {pct: 0, label: '', color: '#e5e7eb'};}
  if (pw.length < 6) {return {pct: 25, label: 'Weak', color: '#ef4444'};}
  if (pw.length < 10) {return {pct: 50, label: 'Fair', color: '#eab308'};}
  if (/[A-Z]/.test(pw) && /\d/.test(pw) && /[^A-Za-z0-9]/.test(pw))
    {return {pct: 100, label: 'Strong', color: '#22c55e'};}
  return {pct: 75, label: 'Good', color: '#3b82f6'};
}

export default function PasswordInput() {
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const strength = getStrength(password);

  return (
    <div style={{padding: 16, maxWidth: 400, fontFamily: 'system-ui'}}>
      <label style={{display: 'block', fontWeight: 600, marginBottom: 4}}>Password</label>
      <input
        type={visible ? 'text' : 'password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, boxSizing: 'border-box'}}
      />
      <button
        onClick={() => setVisible(!visible)}
        style={{marginTop: 8, padding: '4px 8px', background: 'none', border: '1px solid #ccc', borderRadius: 4, cursor: 'pointer', fontSize: 12}}
      >
        {visible ? 'Hide' : 'Show'}
      </button>
      {password && (
        <div style={{marginTop: 12}}>
          <div style={{width: '100%', height: 8, backgroundColor: '#e5e7eb', borderRadius: 4, overflow: 'hidden'}}>
            <div style={{width: `${strength.pct}%`, height: '100%', backgroundColor: strength.color, transition: 'all 0.3s'}} />
          </div>
          <p style={{fontSize: 12, color: '#666', marginTop: 4}}>{strength.label}</p>
        </div>
      )}
    </div>
  );
}
