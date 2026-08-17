import {useState, type FormEvent} from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email'); setStatus('error'); return; }
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email})});
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch { setError('Something went wrong.'); setStatus('error'); }
  };

  if (status === 'success') return <div style={{padding: 24, border: '1px solid #ddd', borderRadius: 8, maxWidth: 360}}><p style={{fontWeight: 600}}>Subscribed!</p><p style={{fontSize: 14, color: '#666'}}>Updates sent to {email}.</p></div>;

  return (
    <div style={{padding: 24, border: '1px solid #ddd', borderRadius: 8, maxWidth: 360}}>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <label style={{fontWeight: 500}}>Email address</label>
        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setStatus('idle'); }} placeholder="you@example.com" style={{padding: 8, borderRadius: 4, border: '1px solid #ccc'}} required />
        {status === 'error' && <p style={{fontSize: 13, color: '#dc2626', margin: 0}}>{error}</p>}
        <button type="submit" disabled={status === 'loading'} style={{padding: '10px 16px', borderRadius: 4, border: 'none', background: '#0066cc', color: '#fff', cursor: 'pointer'}}>
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
}
