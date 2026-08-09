// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Stack} from '@astryxdesign/core/Stack';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';

function getStrength(pw: string) {
  if (pw.length === 0) {return {pct: 0, label: '', color: 'bg-gray-200'};}
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
    <Stack gap={3} padding={4} maxWidth={400}>
      <TextInput
        label="Password"
        type={visible ? 'text' : 'password'}
        value={password}
        onChange={setPassword}
        placeholder="Enter your password"
      />
      <Button
        label={visible ? 'Hide' : 'Show'}
        variant="ghost"
        size="sm"
        onClick={() => setVisible(!visible)}
      />
      {password.length > 0 && (
        <div className="space-y-1">
          <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${strength.color}`}
              style={{width: `${strength.pct}%`}}
            />
          </div>
          <Text type="supporting" color="secondary">{strength.label}</Text>
        </div>
      )}
    </Stack>
  );
}
