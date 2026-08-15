import {useState} from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEmail(email);
    if (validation) {
      setError(validation);
      return;
    }
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Subscription failed. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div style={{padding: '16px', borderRadius: '8px', backgroundColor: '#dcfce7', color: '#166534'}}>
        You have been subscribed.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px', maxWidth: '400px'}}>
      <div>
        <label htmlFor="email" style={{display: 'block', marginBottom: '4px', fontWeight: 500}}>
          Email address <span style={{color: '#ef4444'}}>*</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          style={{width: '100%', padding: '8px 12px', borderRadius: '6px', border: error ? '1px solid #ef4444' : '1px solid #d1d5db'}}
        />
        {error && <p style={{margin: '4px 0 0', fontSize: '14px', color: '#ef4444'}}>{error}</p>}
      </div>
      <button
        type="submit"
        style={{padding: '10px 20px', borderRadius: '8px', backgroundColor: '#3b82f6', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 500}}
      >
        Subscribe
      </button>
    </form>
  );
}
