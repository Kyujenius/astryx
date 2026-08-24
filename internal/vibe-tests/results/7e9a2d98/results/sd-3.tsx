import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {useState} from 'react';

export default function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;
  const isNameValid = name.trim().length > 0;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  const handleSubmit = () => {
    if (isFormValid) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return <VStack gap="md"><p>Registration successful.</p></VStack>;
  }

  return (
    <VStack gap="md">
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
        isRequired
        status={email && !isEmailValid ? {type: 'error', message: 'Enter a valid email'} : undefined}
      />
      <TextInput
        label="Password"
        value={password}
        onChange={setPassword}
        type="password"
        isRequired
        status={password && !isPasswordValid ? {type: 'error', message: 'Minimum 8 characters'} : undefined}
      />
      <Button onPress={handleSubmit} isDisabled={!isFormValid}>
        Submit
      </Button>
    </VStack>
  );
}
