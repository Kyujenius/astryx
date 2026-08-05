// Copyright (c) Meta Platforms, Inc. and affiliates.

"use client";
import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Alert, AlertDescription} from '@/components/ui/alert';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async () => {
    if (!isValidEmail(email)) { setErrorMsg('Please enter a valid email'); return; }
    setErrorMsg('');
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email})});
      if (!res.ok) {throw new Error('Failed');}
      setStatus('success');
    } catch { setStatus('error'); }
  };

  if (status === 'success') {return <Alert><AlertDescription>Subscribed!</AlertDescription></Alert>;}

  return (
    <div className="max-w-sm space-y-3">
      <div className="space-y-1">
        <Label htmlFor="email">Email address</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" disabled={status === 'loading'} />
        {errorMsg && <p className="text-sm text-destructive">{errorMsg}</p>}
      </div>
      {status === 'error' && <Alert variant="destructive"><AlertDescription>Something went wrong.</AlertDescription></Alert>}
      <Button onClick={handleSubmit} disabled={status === 'loading'}>{status === 'loading' ? 'Subscribing...' : 'Subscribe'}</Button>
    </div>
  );
}