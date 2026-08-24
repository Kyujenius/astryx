import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {useState} from 'react';

export default function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid = name.trim() && isEmailValid && isPasswordValid;

  return (
    <div className="max-w-md p-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
        {email && !isEmailValid && <p className="text-sm text-destructive">Enter a valid email</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {password && !isPasswordValid && <p className="text-sm text-destructive">Minimum 8 characters</p>}
      </div>
      <Button disabled={!isFormValid}>Submit</Button>
    </div>
  );
}
