import {useState} from 'react';
import {Card} from '@astryxdesign/core/Card';
import {Button} from '@astryxdesign/core/Button';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Heading} from '@astryxdesign/core/Text';
import {Text} from '@astryxdesign/core/Text';

const steps = ['Personal', 'Address', 'Review'];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');

  return (
    <Card padding={4}>
      <div className="flex flex-col gap-4">
        <Heading level={2}>{steps[step]}</Heading>
        <ProgressBar value={((step + 1) / steps.length) * 100} label={`Step ${step + 1}/${steps.length}`} />
        {step === 0 && (
          <div className="flex flex-col gap-3">
            <TextInput label="Name" value={name} onChange={setName} />
            <TextInput label="Email" value={email} onChange={setEmail} type="email" />
          </div>
        )}
        {step === 1 && (
          <div className="flex flex-col gap-3">
            <TextInput label="Address" value={address} onChange={setAddress} />
            <TextInput label="City" value={city} onChange={setCity} />
          </div>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-2">
            <Text>Name: {name}</Text>
            <Text>Email: {email}</Text>
            <Text>Address: {address}, {city}</Text>
          </div>
        )}
        <div className="flex justify-end gap-2">
          {step > 0 && <Button variant="outlined" onPress={() => setStep(step - 1)}>Back</Button>}
          {step < 2 && <Button variant="filled" onPress={() => setStep(step + 1)}>Next</Button>}
          {step === 2 && <Button variant="filled" onPress={() => alert('Done!')}>Submit</Button>}
        </div>
      </div>
    </Card>
  );
}
