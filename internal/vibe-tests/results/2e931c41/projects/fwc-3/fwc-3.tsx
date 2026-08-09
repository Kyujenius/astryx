// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Stack} from '@astryxdesign/core/Stack';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';

function getStrength(password: string): {value: number; label: string; variant: 'error' | 'warning' | 'success'} {
  if (password.length === 0) {return {value: 0, label: 'Enter a password', variant: 'error'};}
  if (password.length < 6) {return {value: 25, label: 'Weak', variant: 'error'};}
  if (password.length < 10) {return {value: 50, label: 'Fair', variant: 'warning'};}
  if (/[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
    return {value: 100, label: 'Strong', variant: 'success'};
  }
  return {value: 75, label: 'Good', variant: 'warning'};
}

export default function PasswordInput() {
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const strength = getStrength(password);

  return (
    <Stack gap={3} padding={4} maxWidth={400}>
      <TextInput
        label="Password"
        type={isVisible ? 'text' : 'password'}
        value={password}
        onChange={setPassword}
        placeholder="Enter your password"
      />
      <Button
        label={isVisible ? 'Hide password' : 'Show password'}
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible(!isVisible)}
      />
      {password.length > 0 && (
        <Stack gap={1}>
          <ProgressBar
            label="Password strength"
            value={strength.value}
            max={100}
            variant={strength.variant}
            isLabelHidden
          />
          <Text type="supporting" color="secondary">{strength.label}</Text>
        </Stack>
      )}
    </Stack>
  );
}
