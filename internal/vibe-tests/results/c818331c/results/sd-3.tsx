import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';

export default function ValidationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = name.length > 0 && isEmailValid && password.length >= 8;

  return (
    <form onSubmit={(e) => e.preventDefault()} className="max-w-sm mx-auto">
      <div className="flex flex-col gap-4">
        <Heading level={2}>Create Account</Heading>
        <TextInput
          label="Full name"
          value={name}
          onChange={setName}
          isRequired
          status={name.length === 0 ? undefined : {type: 'success'}}
        />
        <TextInput
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          isRequired
          status={
            email.length === 0
              ? undefined
              : isEmailValid
              ? {type: 'success'}
              : {type: 'error', message: 'Enter a valid email address'}
          }
        />
        <TextInput
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          isRequired
          status={
            password.length === 0
              ? undefined
              : password.length >= 8
              ? {type: 'success'}
              : {type: 'error', message: 'Must be at least 8 characters'}
          }
        />
        <Button
          label="Create account"
          variant="primary"
          type="submit"
          isDisabled={!isFormValid}
        />
      </div>
    </form>
  );
}
