import {useState} from 'react';
import {Button} from './components/ui/button';
import {Input} from './components/ui/input';
import {Label} from './components/ui/label';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{type: 'error' | 'success'; message: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus({type: 'error', message: 'Please enter a valid email address.'});
      return;
    }
    setIsLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus({type: 'success', message: 'Subscribed successfully!'});
      setEmail('');
    } catch {
      setStatus({type: 'error', message: 'Something went wrong. Please try again.'});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      {status && (
        <div className={`p-3 rounded-md text-sm ${status.type === 'error' ? 'bg-destructive/10 text-destructive' : 'bg-green-50 text-green-800'}`}>
          {status.message}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </Button>
    </form>
  );
}
