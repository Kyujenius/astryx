import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';

type Step = 'welcome' | 'profile' | 'preferences' | 'done';

export default function OnboardingFlow() {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  if (step === 'welcome') {
    return (
      <VStack gap={4} padding={6} hAlign="center">
        <Heading level={1}>Welcome to Astryx</Heading>
        <Text>Let us help you get set up in just a few steps.</Text>
        <Button label="Get Started" variant="primary" onClick={() => setStep('profile')} />
      </VStack>
    );
  }

  if (step === 'profile') {
    return (
      <VStack gap={4} padding={6}>
        <Heading level={2}>Profile Setup</Heading>
        <Text>Tell us a bit about yourself.</Text>
        <TextInput label="Full Name" value={name} onChange={setName} />
        <TextInput label="Email" value={email} onChange={setEmail} type="email" />
        <HStack gap={2}>
          <Button label="Back" variant="ghost" onClick={() => setStep('welcome')} />
          <Button label="Next" variant="primary" onClick={() => setStep('preferences')} />
        </HStack>
      </VStack>
    );
  }

  if (step === 'preferences') {
    return (
      <VStack gap={4} padding={6}>
        <Heading level={2}>Preferences</Heading>
        <Text>Customize your experience.</Text>
        <CheckboxInput
          label="Enable email notifications"
          isChecked={notifications}
          onChange={setNotifications}
        />
        <CheckboxInput
          label="Dark mode"
          isChecked={darkMode}
          onChange={setDarkMode}
        />
        <HStack gap={2}>
          <Button label="Back" variant="ghost" onClick={() => setStep('profile')} />
          <Button label="Finish" variant="primary" onClick={() => setStep('done')} />
        </HStack>
      </VStack>
    );
  }

  return (
    <VStack gap={4} padding={6} hAlign="center">
      <Heading level={2}>All Done!</Heading>
      <Text>You are all set, {name || 'friend'}. Enjoy your experience.</Text>
      <Button label="Go to Dashboard" variant="primary" onClick={() => {}} />
    </VStack>
  );
}
