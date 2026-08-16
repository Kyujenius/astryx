import {useState, type FormEvent} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Card} from '@astryxdesign/core/Card';
import {Text} from '@astryxdesign/core/Text';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const validate = (value: string): string | null => {
    if (!value) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address';
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const err = validate(email);
    if (err) {
      setErrorMsg(err);
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });
      if (!res.ok) throw new Error('Subscription failed');
      setStatus('success');
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <Card padding={4} width={400}>
        <Text type="label" display="block">Subscribed!</Text>
        <Text display="block">You will receive updates at {email}.</Text>
      </Card>
    );
  }

  return (
    <Card padding={4} width={400}>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <TextInput
          label="Email address"
          type="email"
          value={email}
          onChange={(v) => { setEmail(v); if (status === 'error') setStatus('idle'); }}
          placeholder="you@example.com"
          isRequired
          status={status === 'error' ? {type: 'error', message: errorMsg} : undefined}
        />
        <Button
          label="Subscribe"
          variant="primary"
          type="submit"
          isLoading={status === 'loading'}
        />
      </form>
    </Card>
  );
}
