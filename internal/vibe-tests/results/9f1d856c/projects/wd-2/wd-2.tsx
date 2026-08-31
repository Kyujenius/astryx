import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {TextInput} from '@astryxdesign/core/TextInput';

const steps = ['Personal Info', 'Contact Details', 'Review'];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <Card width={480} padding={5}>
      <VStack gap={4}>
        <VStack gap={2}>
          <Text color="secondary">Step {step + 1} of {steps.length}</Text>
          <ProgressBar value={progress} label="Form progress" />
        </VStack>
        <Heading level={3}>{steps[step]}</Heading>
        {step === 0 && (
          <TextInput label="Full name" value={name} onChange={setName} placeholder="Enter your name" />
        )}
        {step === 1 && (
          <TextInput label="Email address" value={email} onChange={setEmail} placeholder="Enter your email" />
        )}
        {step === 2 && (
          <VStack gap={2}>
            <Text>Name: {name}</Text>
            <Text>Email: {email}</Text>
          </VStack>
        )}
        <HStack gap={2} hAlign="end">
          {step > 0 && (
            <Button label="Back" variant="secondary" onClick={() => setStep(step - 1)} />
          )}
          {step < steps.length - 1 ? (
            <Button label="Next" variant="primary" onClick={() => setStep(step + 1)} />
          ) : (
            <Button label="Submit" variant="primary" onClick={() => {}} />
          )}
        </HStack>
      </VStack>
    </Card>
  );
}
