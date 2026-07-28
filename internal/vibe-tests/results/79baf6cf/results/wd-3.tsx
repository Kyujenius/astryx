// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Card} from '@astryxdesign/core/Card';

type Step = 'welcome' | 'profile' | 'preferences' | 'done';

export default function OnboardingFlow() {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Card padding={6} maxWidth={480}>
      {step === 'welcome' && (
        <VStack gap={4} hAlign="center">
          <Heading level={1}>Welcome</Heading>
          <Text>Let us get you set up. This will only take a minute.</Text>
          <Button label="Get Started" variant="primary" onClick={() => setStep('profile')} />
        </VStack>
      )}
      {step === 'profile' && (
        <VStack gap={4}>
          <Heading level={2}>Profile Setup</Heading>
          <TextInput label="Full Name" value={name} onChange={setName} isRequired />
          <TextInput label="Email" type="email" value={email} onChange={setEmail} isRequired />
          <HStack gap={2} hAlign="end">
            <Button label="Back" variant="ghost" onClick={() => setStep('welcome')} />
            <Button label="Next" variant="primary" onClick={() => setStep('preferences')} />
          </HStack>
        </VStack>
      )}
      {step === 'preferences' && (
        <VStack gap={4}>
          <Heading level={2}>Preferences</Heading>
          <CheckboxInput label="Enable email notifications" value={notifications} onChange={setNotifications} />
          <CheckboxInput label="Dark mode" value={darkMode} onChange={setDarkMode} />
          <HStack gap={2} hAlign="end">
            <Button label="Back" variant="ghost" onClick={() => setStep('profile')} />
            <Button label="Finish" variant="primary" onClick={() => setStep('done')} />
          </HStack>
        </VStack>
      )}
      {step === 'done' && (
        <VStack gap={4} hAlign="center">
          <Heading level={2}>All Done!</Heading>
          <Text>You are all set, {name || 'friend'}. Enjoy the app.</Text>
        </VStack>
      )}
    </Card>
  );
}
