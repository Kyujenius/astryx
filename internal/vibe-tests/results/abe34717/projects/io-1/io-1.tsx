import {useState} from 'react';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!validateEmail(email)) { setError('Please enter a valid email'); return; }
    setError('');
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email})});
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
    } catch { setStatus('error'); setError('Something went wrong.'); }
  };

  return (
    <div style={{padding: 16, fontFamily: 'system-ui', maxWidth: 400}}>
      <label style={{display: 'block', marginBottom: 4, fontWeight: 500}}>Email</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4, marginBottom: 4}} />
      {error && <p style={{color: '#dc2626', fontSize: 12, margin: '4px 0'}}>{error}</p>}
      <button onClick={handleSubmit} disabled={status === 'loading'} style={{marginTop: 8, padding: '8px 16px', background: '#0066cc', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer'}}>
        {status === 'success' ? 'Subscribed!' : status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {status === 'success' && <p style={{color: '#16a34a', fontSize: 14, marginTop: 8}}>Thanks for subscribing!</p>}
    </div>
  );
}
