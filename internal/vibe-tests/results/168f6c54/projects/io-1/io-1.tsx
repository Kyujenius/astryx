// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{type: 'error' | 'success', message: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setStatus({type: 'error', message: 'Please enter a valid email address'});
      return;
    }
    setIsLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/subscribe', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email})});
      if (!res.ok) {throw new Error('Failed');}
      setStatus({type: 'success', message: 'Successfully subscribed!'});
      setEmail('');
    } catch {
      setStatus({type: 'error', message: 'Something went wrong. Please try again.'});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: 16, padding: 24, maxWidth: 360}}>
      <h3 style={{margin: 0, fontSize: 18, fontWeight: 600}}>Subscribe to updates</h3>
      <div style={{display: 'flex', flexDirection: 'column', gap: 4}}>
        <label style={{fontWeight: 500, fontSize: 14}}>Email address *</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={{padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 14}} />
        {status?.type === 'error' && <p style={{color: '#dc2626', fontSize: 12, margin: 0}}>{status.message}</p>}
      </div>
      <button onClick={handleSubmit} disabled={email === '' || isLoading} style={{padding: '10px 16px', borderRadius: 6, background: '#2563eb', color: 'white', border: 'none', cursor: 'pointer', opacity: (email === '' || isLoading) ? 0.5 : 1}}>
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </button>
      {status?.type === 'success' && <div style={{background: '#dcfce7', border: '1px solid #bbf7d0', borderRadius: 8, padding: 12}}><p style={{color: '#166534', margin: 0, fontSize: 14}}>{status.message}</p></div>}
    </div>
  );
}
