import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {Banner} from '@astryxdesign/core/Banner';
import {FormLayout} from '@astryxdesign/core/FormLayout';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{type: 'error' | 'warning' | 'success', message?: string} | undefined>();
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) return {type: 'error' as const, message: 'Email is required'};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return {type: 'error' as const, message: 'Please enter a valid email address'};
    return undefined;
  };

  const handleSubmit = async () => {
    const validation = validateEmail(email);
    if (validation) {
      setStatus(validation);
      return;
    }
    setStatus(undefined);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setStatus({type: 'error', message: 'Subscription failed. Please try again.'});
      }
    } catch {
      setStatus({type: 'error', message: 'Network error. Please try again.'});
    }
  };

  if (submitted) {
    return <Banner status="success" title="Subscribed" description="You have been subscribed." />;
  }

  return (
    <Stack direction="vertical" gap={4} padding={4} maxWidth={400}>
      <FormLayout>
        <TextInput
          label="Email address"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          isRequired
          status={status}
        />
      </FormLayout>
      <Button label="Subscribe" variant="primary" onClick={handleSubmit} />
    </Stack>
  );
}
