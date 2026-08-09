// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Button} from '@/components/ui/button';
import {Progress} from '@/components/ui/progress';

function getStrength(pw: string) {
  if (!pw) {return {pct: 0, label: '', color: ''};}
  if (pw.length < 6) {return {pct: 25, label: 'Weak', color: 'bg-red-500'};}
  if (pw.length < 10) {return {pct: 50, label: 'Fair', color: 'bg-yellow-500'};}
  if (/[A-Z]/.test(pw) && /\d/.test(pw) && /[^A-Za-z0-9]/.test(pw))
    {return {pct: 100, label: 'Strong', color: 'bg-green-500'};}
  return {pct: 75, label: 'Good', color: 'bg-blue-500'};
}

export default function PasswordInput() {
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const strength = getStrength(password);

  return (
    <div className="space-y-3 p-4 max-w-sm">
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type={visible ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <Button variant="ghost" size="sm" onClick={() => setVisible(!visible)}>
        {visible ? 'Hide' : 'Show'}
      </Button>
      {password && (
        <div className="space-y-1">
          <Progress value={strength.pct} className="h-2" />
          <p className="text-xs text-muted-foreground">{strength.label}</p>
        </div>
      )}
    </div>
  );
}
