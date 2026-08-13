import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

export default function ValidationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = name.length > 0 && isEmailValid && password.length >= 8;

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-sm mx-auto flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Create Account</h2>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Full name *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {email && !isEmailValid && (
          <p className="text-sm text-red-500">Enter a valid email address</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">Password *</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {password && password.length < 8 && (
          <p className="text-sm text-red-500">Must be at least 8 characters</p>
        )}
      </div>
      <Button type="submit" disabled={!isFormValid}>Create account</Button>
    </form>
  );
}
