// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  form: { display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 },
});

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{type: 'error' | 'success'; message: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (v: string) => {
    if (!v) {return 'Email is required';}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {return 'Invalid email';}
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(email);
    if (err) { setStatus({type: 'error', message: err}); return; }
    setIsLoading(true);
    try {
      const res = await fetch('/api/subscribe', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email})});
      if (!res.ok) {throw new Error('Failed');}
      setStatus({type: 'success', message: 'Subscribed successfully!'});
      setEmail('');
    } catch { setStatus({type: 'error', message: 'Something went wrong.'}); }
    finally { setIsLoading(false); }
  };

  return (
    <form onSubmit={handleSubmit} {...stylex.props(styles.form)}>
      {status && <Banner type={status.type}>{status.message}</Banner>}
      <TextInput label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" isRequired />
      <Button type="submit" variant="filled" isLoading={isLoading}>Subscribe</Button>
    </form>
  );
}
