// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';

function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) {score++;}
  if (password.length >= 12) {score++;}
  if (/[A-Z]/.test(password)) {score++;}
  if (/[0-9]/.test(password)) {score++;}
  if (/[^A-Za-z0-9]/.test(password)) {score++;}
  if (score <= 1) {return {level: score, label: 'Weak', color: '#ef4444'};}
  if (score <= 3) {return {level: score, label: 'Medium', color: '#eab308'};}
  return {level: score, label: 'Strong', color: '#22c55e'};
}

export default function PasswordInput() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const strength = useMemo(() => getStrength(password), [password]);

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320}}>
      <label htmlFor="password" style={{fontWeight: 500, fontSize: 14}}>Password</label>
      <div style={{display: 'flex', gap: 8}}>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter password"
          style={{flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 14}}
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          style={{padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: 6, background: 'white', cursor: 'pointer'}}
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
      {password.length > 0 && (
        <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
          <div style={{height: 6, background: '#e5e7eb', borderRadius: 3, overflow: 'hidden'}}>
            <div style={{height: '100%', width: `${(strength.level / 5) * 100}%`, background: strength.color, transition: 'width 0.3s'}} />
          </div>
          <span style={{fontSize: 12, color: '#6b7280'}}>Strength: {strength.label}</span>
        </div>
      )}
    </div>
  );
}
