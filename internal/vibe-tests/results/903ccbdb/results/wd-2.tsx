import {useState} from 'react';
import {Stack} from '@astryxdesign/core/Stack';
import {Button} from '@astryxdesign/core/Button';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Card} from '@astryxdesign/core/Card';

const steps = ['Personal Info', 'Contact', 'Review'];

export default function FormWizard() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const progress = ((step + 1) / steps.length) * 100;

  return (
    <Stack direction="vertical" gap={4} maxWidth={600}>
      <ProgressBar value={progress} label="Form progress" />
      <Stack direction="horizontal" gap={2} hAlign="between">
        {steps.map((label, i) => (
          <Text
            key={label}
            type={i === step ? 'label' : 'body'}
            color={i === step ? 'accent' : 'secondary'}
          >
            {i + 1}. {label}
          </Text>
        ))}
      </Stack>

      <Card>
        <Stack direction="vertical" gap={3} padding={4}>
          <Heading level={3}>{steps[step]}</Heading>

          {step === 0 && (
            <>
              <TextInput
                label="First name"
                value={formData.firstName}
                onChange={(v) => setFormData(prev => ({...prev, firstName: v}))}
              />
              <TextInput
                label="Last name"
                value={formData.lastName}
                onChange={(v) => setFormData(prev => ({...prev, lastName: v}))}
              />
            </>
          )}

          {step === 1 && (
            <>
              <TextInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(v) => setFormData(prev => ({...prev, email: v}))}
              />
              <TextInput
                label="Phone"
                value={formData.phone}
                onChange={(v) => setFormData(prev => ({...prev, phone: v}))}
              />
            </>
          )}

          {step === 2 && (
            <Stack direction="vertical" gap={2}>
              <Text>Name: {formData.firstName} {formData.lastName}</Text>
              <Text>Email: {formData.email}</Text>
              <Text>Phone: {formData.phone}</Text>
            </Stack>
          )}
        </Stack>
      </Card>

      <Stack direction="horizontal" gap={2} hAlign="between">
        <Button
          label="Back"
          variant="secondary"
          isDisabled={step === 0}
          onClick={() => setStep(s => s - 1)}
        />
        <Button
          label={step === steps.length - 1 ? 'Submit' : 'Next'}
          variant="primary"
          onClick={() => {
            if (step < steps.length - 1) setStep(s => s + 1);
          }}
        />
      </Stack>
    </Stack>
  );
}
