import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {HStack} from '@astryxdesign/core/HStack';
import {VStack} from '@astryxdesign/core/VStack';
import {Text} from '@astryxdesign/core/Text';

function getStrength(password: string): {level: string; color: 'error' | 'warning' | 'success'} {
  if (password.length < 6) return {level: 'Weak', color: 'error'};
  if (password.length < 10) return {level: 'Medium', color: 'warning'};
  return {level: 'Strong', color: 'success'};
}

export default function PasswordInput() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const strength = getStrength(password);

  return (
    <VStack gap={2}>
      <HStack gap={2} vAlign="end">
        <TextInput
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={setPassword}
          placeholder="Enter password"
          width="100%"
          status={password.length > 0 ? {type: strength.color, message: strength.level} : undefined}
        />
        <Button
          label={showPassword ? 'Hide' : 'Show'}
          variant="ghost"
          onClick={() => setShowPassword(!showPassword)}
        />
      </HStack>
    </VStack>
  );
}
