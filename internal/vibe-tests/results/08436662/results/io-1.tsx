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
  const [status, setStatus] = useState<{type: 'error' | 'success'; msg: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async () => {
    if (!isValid) {
      setStatus({type: 'error', msg: 'Please enter a valid email.'});
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });
      if (!res.ok) throw new Error();
      setStatus({type: 'success', msg: 'Subscribed! Check your inbox.'});
      setEmail('');
    } catch {
      setStatus({type: 'error', msg: 'Something went wrong.'});
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <Card padding={4}>
        <VStack gap={3}>
          <Heading level={3}>Newsletter</Heading>
          <Text color="secondary">Stay updated with the latest news.</Text>
          {status && <Banner type={status.type}>{status.msg}</Banner>}
          <TextInput
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            type="email"
          />
          <Button onPress={handleSubmit} isLoading={loading} width="full">
            Subscribe
          </Button>
        </VStack>
      </Card>
    </div>
  );
}
