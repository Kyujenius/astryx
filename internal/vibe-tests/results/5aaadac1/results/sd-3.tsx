import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  return (
    <div className="space-y-4 p-6 max-w-md">
      <h2 className="text-2xl font-semibold">Create Account</h2>
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        {name && !isNameValid && <p className="text-sm text-destructive">Name is required</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {email && !isEmailValid && <p className="text-sm text-destructive">Enter a valid email</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {password && !isPasswordValid && <p className="text-sm text-destructive">At least 8 characters</p>}
      </div>
      <Button disabled={!isFormValid} className="w-full">Create Account</Button>
    </div>
  );
}
