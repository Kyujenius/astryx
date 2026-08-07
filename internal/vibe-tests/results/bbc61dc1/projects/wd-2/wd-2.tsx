import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {Button} from '@astryxdesign/core/Button';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';

const steps = ['Account', 'Profile', 'Confirm'];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({username: '', displayName: '', bio: ''});

  return (
    <div className="max-w-lg mx-auto p-6">
      <Stack direction="vertical" gap={4}>
        <ProgressBar value={((step + 1) / steps.length) * 100} label="Step progress" />
        <div className="flex gap-4 justify-between">
          {steps.map((s, i) => (
            <Text key={s} weight={i === step ? 'semibold' : 'normal'} color={i === step ? 'accent' : 'secondary'}>
              {i + 1}. {s}
            </Text>
          ))}
        </div>
        <Heading level={3}>{steps[step]}</Heading>
        {step === 0 && <TextInput label="Username" value={data.username} onChange={v => setData(d => ({...d, username: v}))} />}
        {step === 1 && (
          <>
            <TextInput label="Display name" value={data.displayName} onChange={v => setData(d => ({...d, displayName: v}))} />
            <TextInput label="Bio" value={data.bio} onChange={v => setData(d => ({...d, bio: v}))} />
          </>
        )}
        {step === 2 && <Text>Username: {data.username}, Name: {data.displayName}</Text>}
        <Stack direction="horizontal" gap={2} hAlign="between">
          <Button label="Back" variant="secondary" isDisabled={step === 0} onClick={() => setStep(s => s - 1)} />
          <Button label={step === 2 ? 'Submit' : 'Next'} variant="primary" onClick={() => step < 2 && setStep(s => s + 1)} />
        </Stack>
      </Stack>
    </div>
  );
}
