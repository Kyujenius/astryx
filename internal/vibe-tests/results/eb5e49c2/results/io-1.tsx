import {useState} from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });
      if (!res.ok) throw new Error('Failed');
      setSuccess(true);
      setEmail('');
    } catch {
      setError('Something went wrong. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'flex-end', gap: 8, maxWidth: 400}}>
      <div style={{flex: 1}}>
        <label htmlFor="email" style={{display: 'block', fontSize: 14, fontWeight: 500, marginBottom: 4}}>Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          style={{width: '100%', padding: '8px 12px', border: '1px solid #ccc', borderRadius: 4}}
        />
        {error && <p style={{color: '#ef4444', fontSize: 13, margin: '4px 0 0'}}>{error}</p>}
        {success && <p style={{color: '#22c55e', fontSize: 13, margin: '4px 0 0'}}>Subscribed successfully</p>}
      </div>
      <button type="submit" disabled={isLoading} style={{padding: '8px 16px', background: '#0070f3', color: '#fff', border: 'none', borderRadius: 4, cursor: isLoading ? 'not-allowed' : 'pointer'}}>
        {isLoading ? 'Loading...' : 'Subscribe'}
      </button>
    </form>
  );
}
