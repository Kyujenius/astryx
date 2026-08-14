import {useState} from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{type: 'error' | 'success'; msg: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({type: 'error', msg: 'Please enter a valid email.'});
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });
      if (!res.ok) throw new Error();
      setStatus({type: 'success', msg: 'Subscribed successfully!'});
      setEmail('');
    } catch {
      setStatus({type: 'error', msg: 'Something went wrong.'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{fontFamily: 'system-ui, sans-serif', maxWidth: 400, margin: '0 auto', padding: 24}}>
      <div style={{border: '1px solid #e0e0e0', borderRadius: 12, padding: 24}}>
        <h3 style={{margin: '0 0 4px', fontSize: 18, fontWeight: 600}}>Subscribe to our newsletter</h3>
        <p style={{color: '#666', margin: '0 0 16px', fontSize: 14}}>Get the latest updates.</p>
        {status && (
          <div style={{
            padding: '8px 12px', borderRadius: 6, marginBottom: 12, fontSize: 14,
            background: status.type === 'error' ? '#fef2f2' : '#f0fdf4',
            color: status.type === 'error' ? '#dc2626' : '#16a34a',
            border: `1px solid ${status.type === 'error' ? '#fecaca' : '#bbf7d0'}`,
          }}>
            {status.msg}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={{display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4}}>Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 6, fontSize: 14, marginBottom: 12, boxSizing: 'border-box'}}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '10px', background: loading ? '#ccc' : '#0066cc',
              color: '#fff', border: 'none', borderRadius: 6, cursor: loading ? 'default' : 'pointer', fontWeight: 500,
            }}
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </div>
  );
}
