import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {useState} from 'react';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const isValid = name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && message.trim();

  return (
    <form className="space-y-4 max-w-md" onSubmit={e => { e.preventDefault(); alert('Submitted'); }}>
      <div className="space-y-2"><Label>Name *</Label><Input value={name} onChange={e => setName(e.target.value)} required /></div>
      <div className="space-y-2"><Label>Email *</Label><Input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></div>
      <div className="space-y-2"><Label>Message *</Label><Input value={message} onChange={e => setMessage(e.target.value)} required /></div>
      <Button type="submit" disabled={!isValid}>Submit</Button>
    </form>
  );
}