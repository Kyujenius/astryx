// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {Banner} from '@astryxdesign/core/Banner';

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
    <VStack gap={3} padding={4} maxWidth={400}>
      <Heading level={3}>Subscribe to updates</Heading>
      <TextInput
        label="Email address"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        isRequired
        status={status?.type === 'error' ? {type: 'error', message: status.message} : undefined}
      />
      <Button
        label="Subscribe"
        variant="primary"
        onClick={handleSubmit}
        isLoading={isLoading}
        isDisabled={email === ''}
      />
      {status?.type === 'success' && (
        <Banner variant="success">{status.message}</Banner>
      )}
    </VStack>
  );
}
