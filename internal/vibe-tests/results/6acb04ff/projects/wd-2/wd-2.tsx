// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Stack} from '@astryxdesign/core/Stack';
import {ProgressBar} from '@astryxdesign/core/ProgressBar';
import {TextInput} from '@astryxdesign/core/TextInput';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';

const steps = ['Personal Info', 'Contact', 'Review'];

export default function FormWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({name: '', email: '', phone: ''});

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Stack gap={4}>
      <Heading level={2}>{steps[currentStep]}</Heading>
      <ProgressBar value={progress} label="Form progress" />
      <Text type="supporting">Step {currentStep + 1} of {steps.length}</Text>

      {currentStep === 0 && (
        <TextInput
          label="Full name"
          value={formData.name}
          onChange={(value) => setFormData({...formData, name: value})}
          isRequired
        />
      )}
      {currentStep === 1 && (
        <Stack gap={3}>
          <TextInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(value) => setFormData({...formData, email: value})}
            isRequired
          />
          <TextInput
            label="Phone"
            value={formData.phone}
            onChange={(value) => setFormData({...formData, phone: value})}
          />
        </Stack>
      )}
      {currentStep === 2 && (
        <Stack gap={2}>
          <Text>Name: {formData.name}</Text>
          <Text>Email: {formData.email}</Text>
          <Text>Phone: {formData.phone}</Text>
        </Stack>
      )}

      <Stack direction="horizontal" gap={2}>
        <Button
          label="Back"
          variant="secondary"
          isDisabled={currentStep === 0}
          onClick={() => setCurrentStep(currentStep - 1)}
        />
        <Button
          label={currentStep === steps.length - 1 ? 'Submit' : 'Next'}
          variant="primary"
          onClick={() => {
            if (currentStep < steps.length - 1) {
              setCurrentStep(currentStep + 1);
            }
          }}
        />
      </Stack>
    </Stack>
  );
}
