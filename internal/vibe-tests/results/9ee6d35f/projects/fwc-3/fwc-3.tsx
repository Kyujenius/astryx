// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState, useMemo} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {IconButton} from '@astryxdesign/core/IconButton';
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

  const barColor = strength.type === 'error' ? 'bg-red-500' : strength.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500';
  const barWidth = `${(strength.level / 5) * 100}%`;

  return (
    <div className="flex flex-col gap-2 max-w-sm">
      <div className="flex items-end gap-2">
        <TextInput
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={setPassword}
          status={password.length > 0 ? {type: strength.type, message: strength.label} : undefined}
        />
        <IconButton
          label={showPassword ? 'Hide password' : 'Show password'}
          icon="eyeSlash"
          onClick={() => setShowPassword(!showPassword)}
          variant="ghost"
        />
      </div>
      {password.length > 0 && (
        <div className="flex flex-col gap-1">
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className={`h-full ${barColor} transition-all duration-300 rounded-full`} style={{width: barWidth}} />
          </div>
          <Text type="supporting">Strength: {strength.label} ({strength.level}/5)</Text>
        </div>
      )}
    </div>
  );
}
