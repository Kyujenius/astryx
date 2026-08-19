import {useState} from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{type: string; message: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid(email)) { setStatus({type: 'error', message: 'Please enter a valid email.'}); return; }
    setIsLoading(true); setStatus(null);
    try {
      const res = await fetch('/api/subscribe', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email})});
      if (!res.ok) throw new Error();
      setStatus({type: 'success', message: 'Subscribed!'}); setEmail('');
    } catch { setStatus({type: 'error', message: 'Something went wrong.'}); }
    finally { setIsLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 12}}>
      {status && <div style={{padding: '8px 12px', borderRadius: 4, background: status.type === 'error' ? '#fee' : '#efe', border: `1px solid ${status.type === 'error' ? '#fcc' : '#cfc'}`}}>{status.message}</div>}
      <label style={{fontSize: 14, fontWeight: 500}}>Email address</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={{padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}} />
      <button type="submit" disabled={isLoading} style={{padding: '10px 16px', background: '#0066ff', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', opacity: isLoading ? 0.7 : 1}}>{isLoading ? 'Subscribing...' : 'Subscribe'}</button>
    </form>
  );
}
