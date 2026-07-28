// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {IconButton} from '@astryxdesign/core/IconButton';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';

function getStrength(password: string): {level: number; label: string; type: 'error' | 'warning' | 'success'} {
  let score = 0;
  if (password.length >= 8) {score++;}
  if (password.length >= 12) {score++;}
  if (/[A-Z]/.test(password)) {score++;}
  if (/[0-9]/.test(password)) {score++;}
  if (/[^A-Za-z0-9]/.test(password)) {score++;}
  if (score <= 1) {return {level: score, label: 'Weak', type: 'error'};}
  if (score <= 3) {return {level: score, label: 'Medium', type: 'warning'};}
  return {level: score, label: 'Strong', type: 'success'};
}

export default function PasswordInput() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const strength = useMemo(() => getStrength(password), [password]);

  return (
    <VStack gap={2}>
      <HStack gap={1} vAlign="end">
        <TextInput
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={setPassword}
          status={password.length > 0 ? {type: strength.type, message: strength.label} : undefined}
        />
        <IconButton
          label={showPassword ? 'Hide password' : 'Show password'}
          icon={showPassword ? 'eyeSlash' : 'eyeSlash'}
          onClick={() => setShowPassword(!showPassword)}
          variant="ghost"
        />
      </HStack>
      {password.length > 0 && (
        <Text type="supporting" color={strength.type === 'error' ? 'secondary' : 'primary'}>
          Strength: {strength.label} ({strength.level}/5)
        </Text>
      )}
    </VStack>
  );
}
