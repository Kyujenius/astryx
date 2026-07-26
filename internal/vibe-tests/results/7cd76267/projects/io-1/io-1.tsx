// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Alert, AlertDescription} from '@/components/ui/alert';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{type: 'error' | 'success'; message: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus({type: 'error', message: 'Valid email required'}); return; }
    setIsLoading(true);
    try {
      const res = await fetch('/api/subscribe', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email})});
      if (!res.ok) {throw new Error('Failed');}
      setStatus({type: 'success', message: 'Subscribed!'});
      setEmail('');
    } catch { setStatus({type: 'error', message: 'Something went wrong.'}); }
    finally { setIsLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
      {status && <Alert variant={status.type === 'error' ? 'destructive' : 'default'}><AlertDescription>{status.message}</AlertDescription></Alert>}
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
      </div>
      <Button type="submit" disabled={isLoading}>{isLoading ? 'Subscribing...' : 'Subscribe'}</Button>
    </form>
  );
}
