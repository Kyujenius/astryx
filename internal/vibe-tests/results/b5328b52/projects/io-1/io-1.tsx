import {useState} from 'react';
import {Input} from './components/ui/input';
import {Button} from './components/ui/button';
import {Label} from './components/ui/label';
import {Alert, AlertDescription} from './components/ui/alert';

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
      <Alert>
        <AlertDescription>You have been subscribed.</AlertDescription>
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-md">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
      <Button type="submit">Subscribe</Button>
    </form>
  );
}
