import {useState} from 'react';
import {Button} from '@astryxdesign/core/Button';
import {Heading} from '@astryxdesign/core/Heading';
import {Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {CheckboxInput} from '@astryxdesign/core/CheckboxInput';
import {Card} from '@astryxdesign/core/Card';

type Step = 'welcome' | 'profile' | 'preferences' | 'done';

export default function OnboardingFlow() {
  const [step, setStep] = useState<Step>('welcome');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const renderStep = () => {
    switch (step) {
      case 'welcome':
        return (
          <VStack gap={4} align="center">
            <Heading level={1}>Welcome</Heading>
            <Text>Let us get you set up in a few quick steps.</Text>
            <Button onClick={() => setStep('profile')}>Get Started</Button>
          </VStack>
        );
      case 'profile':
        return (
          <VStack gap={3}>
            <Heading level={2}>Profile Setup</Heading>
            <TextInput label="Name" value={name} onChange={setName} placeholder="Your name" />
            <TextInput label="Email" value={email} onChange={setEmail} placeholder="you@example.com" />
            <HStack gap={2}>
              <Button variant="ghost" onClick={() => setStep('welcome')}>Back</Button>
              <Button onClick={() => setStep('preferences')}>Next</Button>
            </HStack>
          </VStack>
        );
      case 'preferences':
        return (
          <VStack gap={3}>
            <Heading level={2}>Preferences</Heading>
            <CheckboxInput label="Enable notifications" isSelected={notifications} onChange={setNotifications} />
            <CheckboxInput label="Dark mode" isSelected={darkMode} onChange={setDarkMode} />
            <HStack gap={2}>
              <Button variant="ghost" onClick={() => setStep('profile')}>Back</Button>
              <Button onClick={() => setStep('done')}>Finish</Button>
            </HStack>
          </VStack>
        );
      case 'done':
        return (
          <VStack gap={4} align="center">
            <Heading level={2}>All Done!</Heading>
            <Text>You are all set, {name || 'friend'}. Enjoy the app.</Text>
          </VStack>
        );
    }
  };

  return (
    <Card style={{maxWidth: 480, margin: '0 auto', padding: 32}}>
      {renderStep()}
    </Card>
  );
}
