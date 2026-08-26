import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Heading} from '@astryxdesign/core/Text';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';

const steps = ['Personal Info', 'Address', 'Review'];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <Card padding={4}>
      <VStack gap={3}>
        <Heading level={2}>{steps[step]}</Heading>
        <ProgressBar value={progress} label={`Step ${step + 1} of ${steps.length}`} />

        {step === 0 && (
          <VStack gap={2}>
            <TextInput label="Full Name" value={name} onChange={setName} />
            <TextInput label="Email" value={email} onChange={setEmail} type="email" />
          </VStack>
        )}

        {step === 1 && (
          <VStack gap={2}>
            <TextInput label="Address" value={address} onChange={setAddress} />
            <TextInput label="City" value={city} onChange={setCity} />
          </VStack>
        )}

        {step === 2 && (
          <VStack gap={1}>
            <Text>Name: {name}</Text>
            <Text>Email: {email}</Text>
            <Text>Address: {address}, {city}</Text>
          </VStack>
        )}

        <HStack gap={2} justify="end">
          {step > 0 && (
            <Button variant="outlined" onPress={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          {step < steps.length - 1 && (
            <Button variant="filled" onPress={() => setStep(step + 1)}>
              Next
            </Button>
          )}
          {step === steps.length - 1 && (
            <Button variant="filled" onPress={() => alert('Submitted!')}>
              Submit
            </Button>
          )}
        </HStack>
      </VStack>
    </Card>
  );
}
