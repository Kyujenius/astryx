import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async () => {
    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    setErrorMsg('');
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });
      if (!res.ok) throw new Error('Failed to subscribe');
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4">
      <TextInput
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        status={errorMsg ? {type: 'error', message: errorMsg} : undefined}
      />
      <Button
        label={status === 'success' ? 'Subscribed!' : 'Subscribe'}
        variant="primary"
        isLoading={status === 'loading'}
        onClick={handleSubmit}
      />
      {status === 'success' && <p className="text-sm text-green-600">Thanks for subscribing!</p>}
    </div>
  );
}
