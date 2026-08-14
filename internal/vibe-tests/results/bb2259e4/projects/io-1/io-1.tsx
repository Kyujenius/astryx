import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {Banner} from '@astryxdesign/core/Banner';
import {Card} from '@astryxdesign/core/Card';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {useState} from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{type: 'error' | 'success'; message: string} | null>(null);
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
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setStatus({type: 'success', message: 'You have been subscribed successfully!'});
      setEmail('');
    } catch {
      setStatus({type: 'error', message: 'Something went wrong. Please try again.'});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card padding={4}>
      <VStack gap={3}>
        <Heading level={3}>Subscribe to our newsletter</Heading>
        <Text color="secondary">Get the latest updates delivered to your inbox.</Text>
        {status && (
          <Banner type={status.type} title={status.type === 'success' ? 'Success' : 'Error'}>
            {status.message}
          </Banner>
        )}
        <TextInput
          label="Email address"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          type="email"
          status={
            status?.type === 'error' && !validateEmail(email)
              ? {type: 'error', message: 'Invalid email format'}
              : undefined
          }
        />
        <Button onPress={handleSubmit} isLoading={isLoading}>
          Subscribe
        </Button>
      </VStack>
    </Card>
  );
}
