import React, {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';

export default function EmailSubscriptionForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{type: 'error' | 'success', message: string} | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setStatus({type: 'error', message: 'Please enter a valid email address'});
      return;
    }

    setIsLoading(true);
    setStatus(undefined);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });

      if (response.ok) {
        setStatus({type: 'success', message: 'Successfully subscribed!'});
        setEmail('');
      } else {
        setStatus({type: 'error', message: 'Subscription failed. Please try again.'});
      }
    } catch {
      setStatus({type: 'error', message: 'Network error. Please try again.'});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{maxWidth: '400px'}}>
      <TextInput
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        status={status}
        isRequired
      />
      <div style={{marginTop: '12px'}}>
        <Button onPress={handleSubmit} isDisabled={isLoading}>
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </div>
    </div>
  );
}
