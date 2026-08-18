import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {useState} from 'react';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  return (
    <form onSubmit={(e) => { e.preventDefault(); alert('Submitted!'); }}>
      <VStack gap={3} padding={4} maxWidth={400}>
        <TextInput
          label="Name"
          value={name}
          onChange={setName}
          isRequired
          status={name && !isNameValid ? { type: 'error', message: 'Name is required' } : undefined}
        />
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          isRequired
          status={email && !isEmailValid ? { type: 'error', message: 'Enter a valid email' } : undefined}
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          isRequired
          status={password && !isPasswordValid ? { type: 'error', message: 'Min 8 characters' } : undefined}
        />
        <Button label="Submit" variant="primary" type="submit" isDisabled={!isFormValid} />
      </VStack>
    </form>
  );
}
