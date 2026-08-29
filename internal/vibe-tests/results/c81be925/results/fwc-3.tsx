import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';
import {Label} from '@/components/ui/label';

function getStrength(pw: string) {
  let s = 0;
  if (pw.length >= 8) s += 25;
  if (pw.length >= 12) s += 15;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s += 20;
  if (/\d/.test(pw)) s += 20;
  if (/[^a-zA-Z0-9]/.test(pw)) s += 20;
  return {score: s, label: s <= 25 ? 'Weak' : s <= 50 ? 'Fair' : s <= 75 ? 'Good' : 'Strong'};
}

export default function PasswordInput() {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const strength = getStrength(password);

  return (
    <div className="space-y-3 max-w-sm">
      <Label htmlFor="pw">Password</Label>
      <div className="flex gap-2">
        <Input id="pw" type={show ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password..." />
        <Button variant="ghost" onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</Button>
      </div>
      {password && (
        <div className="space-y-1">
          <Progress value={strength.score} />
          <p className="text-sm text-muted-foreground">{strength.label}</p>
        </div>
      )}
    </div>
  );
}
