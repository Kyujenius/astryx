import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';

function getStrength(password: string) {
  if (password.length < 6) return {level: 'Weak', color: 'bg-red-500', width: '33%'};
  if (password.length < 10) return {level: 'Medium', color: 'bg-yellow-500', width: '66%'};
  return {level: 'Strong', color: 'bg-green-500', width: '100%'};
}

export default function PasswordInput() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const strength = getStrength(password);

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      <Label htmlFor="password">Password</Label>
      <div className="flex gap-2">
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <Button variant="outline" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? 'Hide' : 'Show'}
        </Button>
      </div>
      {password && (
        <div className="flex flex-col gap-1">
          <div className="h-2 w-full bg-gray-200 rounded">
            <div className={`h-full rounded ${strength.color}`} style={{width: strength.width}} />
          </div>
          <span className="text-xs text-muted-foreground">{strength.level}</span>
        </div>
      )}
    </div>
  );
}
