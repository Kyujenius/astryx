import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {useState} from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{type: 'error' | 'success', message: string} | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus({type: 'error', message: 'Please enter a valid email address'});
      return;
    }
    setStatus(undefined);
    setIsLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email}),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus({type: 'success', message: 'Subscribed successfully'});
      setEmail('');
    } catch {
      setStatus({type: 'error', message: 'Something went wrong. Try again.'});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <TextInput
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        isRequired
        status={status}
      />
      <Button label="Subscribe" type="submit" variant="primary" isLoading={isLoading} />
    </form>
  );
}
