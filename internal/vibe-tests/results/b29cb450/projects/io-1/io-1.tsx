// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email'); setStatus('error'); return; }
    setStatus('loading'); setError('');
    try {
      const res = await fetch('/api/subscribe', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email}) });
      if (!res.ok) {throw new Error();}
      setStatus('success');
    } catch { setError('Something went wrong'); setStatus('error'); }
  };

  return (
    <Card className="max-w-sm">
      <CardHeader><CardTitle>Subscribe</CardTitle></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} disabled={status === 'loading' || status === 'success'} />
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={status === 'loading' || status === 'success'}>
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed' : 'Subscribe'}
          </Button>
          {status === 'success' && <p className="text-sm text-green-600">You have been subscribed.</p>}
        </form>
      </CardContent>
    </Card>
  );
}
