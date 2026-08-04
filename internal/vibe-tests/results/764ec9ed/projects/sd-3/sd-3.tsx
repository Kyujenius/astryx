// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';
import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isNameValid = name.trim().length >= 2;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid = isNameValid && isEmailValid && isPasswordValid;

  const handleSubmit = () => {
    if (isFormValid) {setSubmitted(true);}
  };

  if (submitted) {
    return (
      <VStack gap={3} padding={4}>
        <Heading level={2}>Success</Heading>
        <Text>Your account has been created.</Text>
      </VStack>
    );
  }

  return (
    <VStack gap={3} padding={4}>
      <Heading level={2}>Create Account</Heading>
      <TextInput
        label="Full Name"
        value={name}
        onChange={setName}
        isRequired
        status={name.length > 0 && !isNameValid ? {type: 'error', message: 'Name must be at least 2 characters'} : undefined}
      />
      <TextInput
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        isRequired
        status={email.length > 0 && !isEmailValid ? {type: 'error', message: 'Enter a valid email address'} : undefined}
      />
      <TextInput
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        isRequired
        status={password.length > 0 && !isPasswordValid ? {type: 'error', message: 'Password must be at least 8 characters'} : undefined}
      />
      <Button
        label="Create account"
        variant="primary"
        onClick={handleSubmit}
        isDisabled={!isFormValid}
      />
    </VStack>
  );
}
