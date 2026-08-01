import {Button} from '@astryxdesign/core/Button';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Stack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {useState} from 'react';

const steps = ['Personal Info', 'Contact', 'Review'];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <Stack gap={4} padding={4} maxWidth={600}>
      <Text type="display-3">Registration</Text>
      <ProgressBar label="Form progress" value={progress} hasValueLabel />
      <Text type="supporting" color="secondary">
        Step {step + 1} of {steps.length}: {steps[step]}
      </Text>
      <div className="rounded-xl border border-gray-200 p-6">
        {step === 0 && (
          <TextInput label="Full Name" value={name} onChange={setName} isRequired />
        )}
        {step === 1 && (
          <TextInput label="Email Address" value={email} onChange={setEmail} type="email" isRequired />
        )}
        {step === 2 && (
          <Stack gap={2}>
            <Text type="body">Name: {name}</Text>
            <Text type="body">Email: {email}</Text>
          </Stack>
        )}
      </div>
      <div className="flex gap-3">
        <Button
          label="Back"
          variant="secondary"
          onClick={() => setStep((s) => s - 1)}
          isDisabled={step === 0}
        />
        <Button
          label={step === steps.length - 1 ? 'Submit' : 'Next'}
          variant="primary"
          onClick={() => {
            if (step < steps.length - 1) setStep((s) => s + 1);
          }}
        />
      </div>
    </Stack>
  );
}
