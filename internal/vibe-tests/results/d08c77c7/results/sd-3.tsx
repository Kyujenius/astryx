import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {TextInput} from '@astryxdesign/core/TextInput';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  return (
    <VStack gap={4} padding={4} maxWidth={400}>
      <Heading level={2}>Create Account</Heading>
      <TextInput
        label="Full Name"
        value={name}
        onChange={setName}
        isRequired
        status={name && !isNameValid ? {type: 'error', message: 'Name is required'} : undefined}
      />
      <TextInput
        label="Email"
        value={email}
        onChange={setEmail}
        type="email"
        isRequired
        status={email && !isEmailValid ? {type: 'error', message: 'Enter a valid email'} : undefined}
      />
      <TextInput
        label="Password"
        value={password}
        onChange={setPassword}
        type="password"
        isRequired
        status={password && !isPasswordValid ? {type: 'error', message: 'Must be at least 8 characters'} : undefined}
      />
      <Button
        label="Create Account"
        variant="primary"
        isDisabled={!isFormValid}
        onClick={() => {}}
        type="submit"
      />
    </VStack>
  );
}
