// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{type: string; message: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus({type: 'error', message: 'Valid email required'}); return; }
    setIsLoading(true);
    try {
      const res = await fetch('/api/subscribe', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email})});
      if (!res.ok) {throw new Error('Failed');}
      setStatus({type: 'success', message: 'Subscribed!'});
      setEmail('');
    } catch { setStatus({type: 'error', message: 'Something went wrong.'}); }
    finally { setIsLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400}}>
      {status && <div style={{padding: '12px 16px', borderRadius: 6, backgroundColor: status.type === 'error' ? '#fef2f2' : '#f0fdf4', color: status.type === 'error' ? '#dc2626' : '#16a34a', border: `1px solid ${status.type === 'error' ? '#fecaca' : '#bbf7d0'}`}}>{status.message}</div>}
      <label style={{display: 'flex', flexDirection: 'column', gap: 4}}>
        <span style={{fontSize: 14, fontWeight: 500}}>Email address</span>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required style={{padding: '8px 12px', border: '1px solid #ddd', borderRadius: 6}} />
      </label>
      <button type="submit" disabled={isLoading} style={{padding: '10px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', opacity: isLoading ? 0.7 : 1}}>{isLoading ? 'Subscribing...' : 'Subscribe'}</button>
    </form>
  );
}
