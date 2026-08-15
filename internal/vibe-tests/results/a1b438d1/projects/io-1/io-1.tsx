import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Banner} from '@astryxdesign/core/Banner';

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
    <div className="flex flex-col gap-4 p-4 max-w-md">
      <TextInput
        label="Email address"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        isRequired
        status={status}
      />
      <Button label="Subscribe" variant="primary" onClick={handleSubmit} />
    </div>
  );
}
