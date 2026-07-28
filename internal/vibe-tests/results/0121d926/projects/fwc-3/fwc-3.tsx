// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Progress} from '@/components/ui/progress';

function getStrength(password: string) {
  let score = 0;
  if (password.length >= 8) {score++;}
  if (password.length >= 12) {score++;}
  if (/[A-Z]/.test(password)) {score++;}
  if (/[0-9]/.test(password)) {score++;}
  if (/[^A-Za-z0-9]/.test(password)) {score++;}
  if (score <= 1) {return {level: score, label: 'Weak', color: 'bg-red-500'};}
  if (score <= 3) {return {level: score, label: 'Medium', color: 'bg-yellow-500'};}
  return {level: score, label: 'Strong', color: 'bg-green-500'};
}

export default function PasswordInput() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const strength = useMemo(() => getStrength(password), [password]);

  return (
    <div className="flex flex-col gap-2 max-w-sm">
      <Label htmlFor="password">Password</Label>
      <div className="flex gap-2">
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <Button variant="outline" size="icon" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
          {showPassword ? '\u{1F648}' : '\u{1F441}'}
        </Button>
      </div>
      {password.length > 0 && (
        <div className="flex flex-col gap-1">
          <Progress value={(strength.level / 5) * 100} className="h-2" />
          <p className="text-sm text-muted-foreground">Strength: {strength.label}</p>
        </div>
      )}
    </div>
  );
}
