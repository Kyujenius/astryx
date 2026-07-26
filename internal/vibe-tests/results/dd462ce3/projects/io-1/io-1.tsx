// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';

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
      {status && <Banner type={status.type}>{status.message}</Banner>}
      <TextInput label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" isRequired />
      <Button type="submit" variant="filled" isLoading={isLoading}>Subscribe</Button>
    </form>
  );
}
