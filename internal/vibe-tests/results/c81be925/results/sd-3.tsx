import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Checkbox} from '@/components/ui/checkbox';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [agreed, setAgreed] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValid = name.trim().length > 0 && isEmailValid && role.length > 0 && agreed;

  return (
    <div className="space-y-6 max-w-md">
      <h2 className="text-2xl font-bold">Registration</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name *</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {email && !isEmailValid && <p className="text-sm text-destructive">Enter a valid email</p>}
        </div>
        <div className="space-y-2">
          <Label>Role *</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger><SelectValue placeholder="Select your role..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Developer">Developer</SelectItem>
              <SelectItem value="Designer">Designer</SelectItem>
              <SelectItem value="Manager">Manager</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="terms" checked={agreed} onCheckedChange={(c) => setAgreed(c === true)} />
          <Label htmlFor="terms">I agree to the terms and conditions</Label>
        </div>
        <Button disabled={!isValid} onClick={() => alert('Submitted!')}>Submit</Button>
      </div>
    </div>
  );
}
