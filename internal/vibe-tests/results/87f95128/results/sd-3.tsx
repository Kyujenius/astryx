import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {useState} from 'react';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const isNameValid = name.trim().length > 0;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isNameValid && isEmailValid && message.trim().length > 0;
  const nameStatus = name && !isNameValid ? {type: 'error' as const, message: 'Name is required'} : undefined;
  const emailStatus = email && !isEmailValid ? {type: 'error' as const, message: 'Enter a valid email'} : undefined;

  return (
    <Stack gap={3}>
      <TextInput label="Name" value={name} onChange={setName} isRequired status={nameStatus} />
      <TextInput label="Email" type="email" value={email} onChange={setEmail} isRequired status={emailStatus} />
      <TextInput label="Message" value={message} onChange={setMessage} isRequired />
      <Button label="Submit" variant="primary" type="submit" isDisabled={!isFormValid} onClick={() => alert('Submitted')} />
    </Stack>
  );
}