import {useState} from 'react';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Selector} from '@astryxdesign/core/Selector';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Button} from '@astryxdesign/core/Button';
import {FormLayout} from '@astryxdesign/core/FormLayout';
import {Heading} from '@astryxdesign/core/Heading';
import {VStack} from '@astryxdesign/core/VStack';

export default function ValidatedForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [agreed, setAgreed] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = name.trim().length > 0 && isEmailValid && role.length > 0 && agreed;

  return (
    <VStack gap="lg">
      <Heading level={2}>Registration</Heading>
      <FormLayout>
        <TextInput
          label="Full name"
          value={name}
          onChange={setName}
          isRequired
          status={name.length > 0 && name.trim().length === 0 ? {type: 'error', message: 'Name cannot be blank'} : undefined}
        />
        <TextInput
          label="Email"
          value={email}
          onChange={setEmail}
          isRequired
          type="email"
          status={email.length > 0 && !isEmailValid ? {type: 'error', message: 'Enter a valid email address'} : undefined}
        />
        <Selector
          label="Role"
          options={['Developer', 'Designer', 'Manager', 'Other']}
          value={role}
          onChange={setRole}
          isRequired
          placeholder="Select your role..."
        />
        <CheckboxInput
          label="I agree to the terms and conditions"
          value={agreed}
          onChange={setAgreed}
        />
        <Button
          label="Submit"
          variant="primary"
          isDisabled={!isFormValid}
          onPress={() => alert('Form submitted!')}
        />
      </FormLayout>
    </VStack>
  );
}
