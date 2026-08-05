// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async () => {
    if (!isValidEmail(email)) { setErrorMsg('Please enter a valid email address'); return; }
    setErrorMsg('');
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email})});
      if (!res.ok) {throw new Error('Failed');}
      setStatus('success');
    } catch { setStatus('error'); }
  };

  if (status === 'success') {return <div style={{padding: 16, background: '#e8f5e9', borderRadius: 4}}>Subscribed!</div>;}

  return (
    <div style={{padding: 16, maxWidth: 320, fontFamily: 'sans-serif'}}>
      <label style={{display: 'block', marginBottom: 4, fontWeight: 'bold'}}>Email address</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" disabled={status === 'loading'} style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: 4, marginBottom: 4}} />
      {errorMsg && <p style={{color: 'red', fontSize: 12, margin: '4px 0'}}>{errorMsg}</p>}
      {status === 'error' && <p style={{color: 'red', margin: '8px 0'}}>Something went wrong.</p>}
      <button onClick={handleSubmit} disabled={status === 'loading'} style={{marginTop: 8, padding: '8px 16px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', opacity: status === 'loading' ? 0.6 : 1}}>
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
    </div>
  );
}