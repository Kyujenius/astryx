// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = name.trim() !== '' && isEmailValid && password.length >= 8;

  return (
    <Stack gap={4}>
      <Heading level={2}>Create Account</Heading>
      <TextInput
        label="Name"
        value={name}
        onChange={setName}
        isRequired
        status={name.trim() === '' && name !== '' ? {type: 'error', message: 'Name is required'} : undefined}
      />
      <TextInput
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        isRequired
        status={email !== '' && !isEmailValid ? {type: 'error', message: 'Enter a valid email'} : undefined}
      />
      <TextInput
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        isRequired
        status={password !== '' && password.length < 8 ? {type: 'error', message: 'Minimum 8 characters'} : undefined}
      />
      <Button
        label="Submit"
        variant="primary"
        type="submit"
        isDisabled={!isFormValid}
      />
    </Stack>
  );
}
