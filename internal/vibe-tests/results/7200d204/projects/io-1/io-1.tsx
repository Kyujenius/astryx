import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {Banner} from '@astryxdesign/core/Banner';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{type: 'error' | 'success', message: string} | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setStatus({type: 'error', message: 'Please enter a valid email address.'});
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
      if (!res.ok) throw new Error('Subscription failed');
      setStatus({type: 'success', message: 'Subscribed successfully!'});
      setEmail('');
    } catch {
      setStatus({type: 'error', message: 'Something went wrong. Please try again.'});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack gap="md">
      {status && (
        <Banner variant={status.type === 'success' ? 'success' : 'error'}>
          {status.message}
        </Banner>
      )}
      <TextInput
        label="Email address"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        isRequired
        status={status?.type === 'error' && !validateEmail(email) ? {type: 'error', message: 'Invalid email format'} : undefined}
      />
      <Button
        variant="filled"
        onPress={handleSubmit}
        isLoading={isLoading}
      >
        Subscribe
      </Button>
    </Stack>
  );
}
