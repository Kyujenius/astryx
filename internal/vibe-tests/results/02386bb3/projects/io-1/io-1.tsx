// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';

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

  if (status === 'success') {return <Banner status="success" title="Subscribed!" />;}

  return (
    <div className="max-w-sm space-y-3">
      <TextInput label="Email address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" status={errorMsg ? {type: 'error', message: errorMsg} : undefined} isDisabled={status === 'loading'} />
      {status === 'error' && <Banner status="error" title="Something went wrong." />}
      <Button label={status === 'loading' ? 'Subscribing...' : 'Subscribe'} onPress={handleSubmit} isDisabled={status === 'loading'} />
    </div>
  );
}