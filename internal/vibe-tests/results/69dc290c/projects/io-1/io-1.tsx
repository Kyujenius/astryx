import React, {useState} from 'react';

export default function EmailSubscriptionForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });
      if (response.ok) {
        setSuccess('Successfully subscribed!');
        setEmail('');
      } else {
        setError('Subscription failed.');
      }
    } catch {
      setError('Network error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{maxWidth: '400px', margin: '0 auto', padding: '24px'}}>
      <label style={{display: 'block', fontWeight: '500', marginBottom: '4px'}}>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={{width: '100%', padding: '10px', border: `1px solid ${error ? '#ef4444' : '#ddd'}`, borderRadius: '6px', marginBottom: '8px'}} />
      {error && <p style={{color: '#ef4444', fontSize: '14px', margin: '0 0 8px'}}>{error}</p>}
      {success && <p style={{color: '#22c55e', fontSize: '14px', margin: '0 0 8px'}}>{success}</p>}
      <button type="submit" disabled={isLoading} style={{padding: '10px 20px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer'}}>
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </button>
    </form>
  );
}
