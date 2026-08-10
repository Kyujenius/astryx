// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Alert, AlertDescription} from '@/components/ui/alert';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{type: 'error' | 'success', message: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setStatus({type: 'error', message: 'Please enter a valid email address'});
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
      if (!res.ok) {throw new Error('Subscription failed');}
      setStatus({type: 'success', message: 'Successfully subscribed!'});
      setEmail('');
    } catch {
      setStatus({type: 'error', message: 'Something went wrong. Please try again.'});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 max-w-sm">
      <h3 className="text-lg font-semibold">Subscribe to updates</h3>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email address *</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
        {status?.type === 'error' && (
          <p className="text-sm text-destructive">{status.message}</p>
        )}
      </div>
      <Button onClick={handleSubmit} disabled={email === '' || isLoading}>
        {isLoading ? 'Subscribing...' : 'Subscribe'}
      </Button>
      {status?.type === 'success' && (
        <Alert>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
