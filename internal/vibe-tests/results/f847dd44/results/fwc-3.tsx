import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Button} from '@astryxdesign/core/Button';
import {Text} from '@astryxdesign/core/Text';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';

function getStrength(password: string): {score: number; label: string} {
  let score = 0;
  if (password.length >= 8) score += 25;
  if (password.length >= 12) score += 15;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 20;
  if (/\d/.test(password)) score += 20;
  if (/[^a-zA-Z0-9]/.test(password)) score += 20;
  if (score <= 25) return {score, label: 'Weak'};
  if (score <= 50) return {score, label: 'Fair'};
  if (score <= 75) return {score, label: 'Good'};
  return {score, label: 'Strong'};
}

export default function PasswordInput() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const strength = getStrength(password);

  return (
    <VStack gap="sm">
      <HStack gap="sm" align="end">
        <TextInput
          label="Password"
          value={password}
          onChange={setPassword}
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password..."
        />
        <Button
          label={showPassword ? 'Hide' : 'Show'}
          variant="ghost"
          onPress={() => setShowPassword(!showPassword)}
        />
      </HStack>
      {password && (
        <VStack gap="xs">
          <ProgressBar label="Password strength" value={strength.score} max={100} isLabelHidden />
          <Text type="supporting">{strength.label}</Text>
        </VStack>
      )}
    </VStack>
  );
}
