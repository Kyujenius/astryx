// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/Stack';
import {Card} from '@astryxdesign/core/Card';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address');
      setStatus('error');
      return;
    }
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });
      if (!res.ok) {throw new Error('Failed to subscribe');}
      setStatus('success');
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <Card padding={4} maxWidth={400}>
      <VStack gap={3}>
        <TextInput
          label="Email address"
          value={email}
          onChange={setEmail}
          type="email"
          placeholder="you@example.com"
          status={status === 'error' ? {type: 'error', message: errorMsg} : undefined}
          isDisabled={status === 'loading' || status === 'success'}
        />
        <Button
          label={status === 'success' ? 'Subscribed' : 'Subscribe'}
          variant="primary"
          isLoading={status === 'loading'}
          isDisabled={status === 'success'}
          onClick={handleSubmit}
        />
        {status === 'success' && <Text color="accent">You have been subscribed.</Text>}
      </VStack>
    </Card>
  );
}
