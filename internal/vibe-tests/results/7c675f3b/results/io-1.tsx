import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
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
    <form onSubmit={handleSubmit} className="flex items-end gap-2 max-w-md">
      <div className="flex-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        {success && <p className="text-sm text-green-500 mt-1">Subscribed successfully</p>}
      </div>
      <Button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Subscribe'}</Button>
    </form>
  );
}
