import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 max-w-sm">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button onClick={handleSubmit} disabled={status === 'loading'}>
        {status === 'success' ? 'Subscribed!' : status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </Button>
      {status === 'success' && <p className="text-sm text-green-600">Thanks for subscribing!</p>}
    </div>
  );
}
